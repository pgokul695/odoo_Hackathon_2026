from fastapi import APIRouter, Depends, Path
from sqlalchemy.orm import Session
from core.response import StandardResponse
from core.database import get_db
from core.dependencies import require_verified_and_assigned, require_role
from core.security import get_current_user
from core.exceptions import AppException
from core.utils import log_activity
from shared.enums import Role
from shared.models import Transfer, User
from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime
from sqlalchemy import or_

router = APIRouter(dependencies=[Depends(require_verified_and_assigned())])

class TransferCreate(BaseModel):
    asset_id: UUID
    from_department_id: Optional[UUID]
    to_department_id: Optional[UUID]

@router.get("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def list_transfers(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Transfer)
    
    if current_user.role == Role.Employee.value:
        # Assuming we track requester in real system, but for now we'll just filter on nothing/mock
        pass
    elif current_user.role == Role.DepartmentHead.value:
        query = query.filter(or_(
            Transfer.from_department_id == current_user.department_id,
            Transfer.to_department_id == current_user.department_id
        ))
        
    transfers = query.all()
    data = [{
        "id": str(t.id),
        "asset_id": str(t.asset_id),
        "from_department_id": str(t.from_department_id) if t.from_department_id else None,
        "to_department_id": str(t.to_department_id) if t.to_department_id else None,
        "status": t.status,
        "requested_at": t.requested_at.isoformat(),
        "resolved_at": t.resolved_at.isoformat() if t.resolved_at else None
    } for t in transfers]
    return StandardResponse(data=data)

@router.post("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def initiate_transfer(
    req: TransferCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    transfer = Transfer(
        asset_id=req.asset_id,
        from_department_id=req.from_department_id,
        to_department_id=req.to_department_id
    )
    db.add(transfer)
    db.commit()
    log_activity(db, "transfers", "initiated", f"Initiated transfer for asset {req.asset_id}", current_user.id)
    return StandardResponse(message="Transfer initiated", data={"id": str(transfer.id)})

@router.put("/{id}/approve/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def approve_transfer(
    id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    transfer = db.query(Transfer).filter(Transfer.id == id).first()
    if not transfer:
        raise AppException(status_code=404, message="Transfer not found")
        
    if current_user.role == Role.DepartmentHead.value:
        if current_user.department_id not in [transfer.from_department_id, transfer.to_department_id]:
            raise AppException(status_code=403, message="This request is outside your department's scope.")
            
    transfer.status = "APPROVED"
    transfer.resolved_at = datetime.utcnow()
    db.commit()
    log_activity(db, "transfers", "approved", f"Approved transfer {id}", current_user.id)
    return StandardResponse(message="Transfer approved")

@router.put("/{id}/reject/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def reject_transfer(
    id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    transfer = db.query(Transfer).filter(Transfer.id == id).first()
    if not transfer:
        raise AppException(status_code=404, message="Transfer not found")
        
    if current_user.role == Role.DepartmentHead.value:
        if current_user.department_id not in [transfer.from_department_id, transfer.to_department_id]:
            raise AppException(status_code=403, message="This request is outside your department's scope.")
            
    transfer.status = "REJECTED"
    transfer.resolved_at = datetime.utcnow()
    db.commit()
    log_activity(db, "transfers", "rejected", f"Rejected transfer {id}", current_user.id)
    return StandardResponse(message="Transfer rejected")
