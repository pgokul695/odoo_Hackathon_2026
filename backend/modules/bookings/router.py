from fastapi import APIRouter, Depends, Path, Query
from sqlalchemy.orm import Session
from core.response import StandardResponse
from core.database import get_db
from core.dependencies import require_verified_and_assigned, require_role
from core.security import get_current_user
from core.exceptions import AppException
from core.utils import log_activity
from shared.enums import Role
from shared.models import Booking, Asset, User
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

router = APIRouter(dependencies=[Depends(require_verified_and_assigned())])

class BookingCreate(BaseModel):
    asset_id: UUID
    start_time: datetime
    end_time: datetime

@router.get("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def list_bookings(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Booking)
    
    if current_user.role == Role.Employee.value:
        query = query.filter(Booking.employee_id == current_user.id)
    elif current_user.role == Role.DepartmentHead.value:
        query = query.join(Asset).filter(Asset.department_id == current_user.department_id)
        
    bookings = query.offset(skip).limit(limit).all()
    data = [{
        "id": str(b.id), 
        "asset_id": str(b.asset_id), 
        "employee_id": str(b.employee_id), 
        "start_time": b.start_time.isoformat(),
        "end_time": b.end_time.isoformat(),
        "status": b.status
    } for b in bookings]
    
    return StandardResponse(data=data)

@router.post("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def create_booking(
    req: BookingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if req.end_time <= req.start_time:
        raise AppException(status_code=400, message="end_time must be strictly after start_time")
    
    if req.start_time < datetime.utcnow():
        raise AppException(status_code=400, message="start_time cannot be in the past")
        
    asset = db.query(Asset).filter(Asset.id == req.asset_id).first()
    if not asset:
        raise AppException(status_code=404, message="Asset not found")
        
    if asset.status != "AVAILABLE":
        raise AppException(status_code=400, message="Asset is not available for booking")
        
    # Check overlaps for CONFIRMED bookings only
    overlapping = db.query(Booking).filter(
        Booking.asset_id == asset.id,
        Booking.status == "CONFIRMED",
        Booking.start_time < req.end_time,
        Booking.end_time > req.start_time
    ).first()
    
    if overlapping:
        raise AppException(status_code=409, message="Requested time window overlaps with an existing confirmed booking")
        
    booking = Booking(
        asset_id=asset.id,
        employee_id=current_user.id,
        start_time=req.start_time.replace(tzinfo=None),
        end_time=req.end_time.replace(tzinfo=None),
        status="CONFIRMED"
    )
    db.add(booking)
    db.commit()
    
    log_activity(db, "bookings", "created", f"Created confirmed booking {booking.id} for asset {asset.id}", current_user.id)
    return StandardResponse(message="Booking confirmed", data={"id": str(booking.id)})

@router.put("/{id}/cancel/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def cancel_booking(
    id: str = Path(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    booking = db.query(Booking).filter(Booking.id == id).first()
    if not booking:
        raise AppException(status_code=404, message="Booking not found")
        
    if booking.status == "CANCELLED":
        raise AppException(status_code=409, message="Booking is already cancelled")
        
    # Scope gates
    if current_user.role == Role.Employee.value:
        if booking.employee_id != current_user.id:
            raise AppException(status_code=403, message="Employees can only cancel their own bookings")
    elif current_user.role == Role.DepartmentHead.value:
        asset = db.query(Asset).filter(Asset.id == booking.asset_id).first()
        if not asset or asset.department_id != current_user.department_id:
            raise AppException(status_code=403, message="Department Heads can only cancel bookings for assets in their department")
            
    booking.status = "CANCELLED"
    db.commit()
    
    log_activity(db, "bookings", "cancelled", f"Cancelled booking {id}", current_user.id)
    return StandardResponse(message="Booking cancelled")
