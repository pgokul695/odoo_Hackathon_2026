from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.response import StandardResponse
from core.database import get_db
from core.dependencies import require_verified_and_assigned, require_role
from core.security import get_current_user
from core.exceptions import AppException
from core.utils import log_activity
from shared.enums import Role
from shared.models import Booking, User

router = APIRouter(dependencies=[Depends(require_verified_and_assigned())])


@router.get("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def list_bookings(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Booking)
    
    if current_user.role == Role.Employee.value:
        query = query.filter(Booking.employee_id == current_user.id)
    elif current_user.role == Role.DepartmentHead.value:
        query = query.filter(Booking.department_id == current_user.department_id)
        
    bookings = query.all()
    data = [{"id": str(b.id), "resource_name": b.resource_name, "employee_id": str(b.employee_id), "department_id": str(b.department_id) if b.department_id else None} for b in bookings]
    return StandardResponse(data=data)

@router.post("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def create_booking():
    return StandardResponse(data={"id": "new-booking-id"}, message="Booking created placeholder")

@router.put("/{id}/cancel/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def cancel_booking(
    id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    booking = db.query(Booking).filter(Booking.id == id).first()
    if not booking:
        raise AppException(status_code=404, message="Booking not found")
        
    if current_user.role in [Role.Employee.value, Role.DepartmentHead.value]:
        if booking.employee_id != current_user.id:
            raise AppException(status_code=403, message="You do not have permission to cancel this booking")
            
    db.delete(booking)
    log_activity(db, "bookings", "cancelled", f"Cancelled booking {id}", current_user.id)
    return StandardResponse(message="Booking cancelled")
