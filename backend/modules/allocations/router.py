from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.response import StandardResponse
from core.database import get_db
from core.dependencies import require_verified_and_assigned, require_role
from core.security import get_current_user
from core.exceptions import AppException
from core.utils import log_activity
from shared.enums import Role
from shared.models import Allocation, Asset, User
from pydantic import BaseModel
from modules.assets.services import AssetStateService
from modules.notifications.service import notify
from uuid import UUID
from datetime import datetime

router = APIRouter(dependencies=[Depends(require_verified_and_assigned())])

class AllocationCreate(BaseModel):
    asset_id: UUID
    employee_id: UUID

class ReturnRequest(BaseModel):
    condition_notes: str


@router.get("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def list_allocations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Allocation).join(Asset)
    
    if current_user.role == Role.Employee.value:
        query = query.filter(Allocation.employee_id == current_user.id)
    elif current_user.role == Role.DepartmentHead.value:
        query = query.filter(Asset.department_id == current_user.department_id)
        
    allocs = query.all()
    data = [{"id": str(a.id), "asset_id": str(a.asset_id), "employee_id": str(a.employee_id)} for a in allocs]
    return StandardResponse(data=data)

@router.post("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.AssetManager, Role.Admin))])
async def create_allocation(
    req: AllocationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    asset = db.query(Asset).filter(Asset.id == req.asset_id).first()
    if not asset:
        raise AppException(status_code=404, message="Asset not found")
        
    if asset.status != "AVAILABLE":
        raise AppException(status_code=409, message="Asset is not available for allocation")
        
    alloc = Allocation(
        asset_id=asset.id,
        employee_id=req.employee_id,
        status="ACTIVE",
        allocated_at=datetime.utcnow()
    )
    db.add(alloc)
    
    AssetStateService.transition(asset, "ALLOCATED", db, current_user.id)
    
    db.commit()
    log_activity(db, "allocations", "created", f"Allocated asset {asset.id} to user {current_user.id}", current_user.id)
    
    notify(db, f"Asset {asset.name} has been allocated to you", [current_user], current_user.id)
    db.commit()
    
    return StandardResponse(message="Allocation created", data={"id": str(alloc.id)})

@router.put("/{id}/return/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.AssetManager, Role.Admin))])
async def return_allocation(
    req: ReturnRequest,
    id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    alloc = db.query(Allocation).filter(Allocation.id == id).first()
    if not alloc:
        raise AppException(status_code=404, message="Allocation not found")
        
    if alloc.status != "ACTIVE":
        raise AppException(status_code=409, message="Allocation is already returned")
        
    asset = db.query(Asset).filter(Asset.id == alloc.asset_id).first()
    if not asset:
        raise AppException(status_code=404, message="Asset not found")

    alloc.status = "RETURNED"
    alloc.returned_at = datetime.utcnow()
    alloc.condition_notes = req.condition_notes
    
    AssetStateService.transition(asset, "AVAILABLE", db, current_user.id)
    
    db.commit()
    log_activity(db, "allocations", "returned", f"Returned allocation {id}. Notes: {req.condition_notes}", current_user.id)
    
    target_employee = db.query(User).filter(User.id == alloc.employee_id).first()
    if target_employee:
        notify(db, f"Asset {asset.name} has been successfully returned", [target_employee], current_user.id)
        db.commit()
        
    return StandardResponse(message="Asset returned successfully")
