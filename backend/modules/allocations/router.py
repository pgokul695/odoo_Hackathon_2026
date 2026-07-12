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

router = APIRouter(dependencies=[Depends(require_verified_and_assigned())])

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
async def create_allocation():
    return StandardResponse(data={"id": "new-allocation-id"}, message="Allocation created placeholder")

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
        
    db.delete(alloc) # Or mark returned, but spec doesn't have a status field for allocations
    
    log_activity(db, "allocations", "returned", f"Returned allocation {id}. Notes: {req.condition_notes}", current_user.id)
    return StandardResponse(message="Asset returned successfully")
