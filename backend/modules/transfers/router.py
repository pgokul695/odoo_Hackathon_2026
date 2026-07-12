from fastapi import APIRouter, Depends, Path, Query
from sqlalchemy.orm import Session
from core.response import StandardResponse
from core.database import get_db
from core.dependencies import require_verified_and_assigned, require_role, check_department_scope
from core.security import get_current_user
from core.exceptions import AppException
from core.utils import log_activity
from shared.enums import Role
from shared.models import Transfer, Asset, User
from modules.assets.services import AssetStateService
from modules.notifications.service import notify, department_heads
from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime
from sqlalchemy import or_

router = APIRouter(dependencies=[Depends(require_verified_and_assigned())])

class TransferCreate(BaseModel):
    asset_id: UUID
    from_department_id: Optional[UUID] = None
    to_department_id: Optional[UUID] = None

@router.get("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def list_transfers(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Transfer)
    
    if current_user.role == Role.Employee.value:
        query = query.filter(Transfer.requested_by_id == current_user.id)
    elif current_user.role == Role.DepartmentHead.value:
        query = query.filter(or_(
            Transfer.from_department_id == current_user.department_id,
            Transfer.to_department_id == current_user.department_id
        ))
        
    transfers = query.offset(skip).limit(limit).all()
    data = [{
        "id": str(t.id),
        "asset_id": str(t.asset_id),
        "requested_by_id": str(t.requested_by_id),
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
    asset = db.query(Asset).filter(Asset.id == req.asset_id).first()
    if not asset:
        raise AppException(status_code=404, message="Asset not found")
        
    if asset.status in ["UNDER_MAINTENANCE", "RETIRED"]:
        raise AppException(status_code=400, message="Asset is not available for transfer")
        
    # from_department_id resolution
    from_dept = req.from_department_id
    if not from_dept:
        from_dept = asset.department_id
    elif from_dept != asset.department_id:
        raise AppException(status_code=400, message="Provided from_department_id does not match asset's current department")
        
    if not req.to_department_id:
        raise AppException(status_code=400, message="to_department_id is required")
        
    if req.to_department_id == from_dept:
        raise AppException(status_code=400, message="Cannot transfer to the same department")
        
    pending = db.query(Transfer).filter(Transfer.asset_id == asset.id, Transfer.status == "PENDING").first()
    if pending:
        raise AppException(status_code=409, message="Asset already has a pending transfer")
        
    t_req = Transfer(
        asset_id=req.asset_id,
        requested_by_id=current_user.id,
        from_department_id=from_dept,
        to_department_id=req.to_department_id,
        status="PENDING"
    )
    db.add(t_req)
    db.commit()
    
    log_activity(db, "transfers", "created", f"Requested transfer {t_req.id}", current_user.id)
    
    heads = department_heads(db, t_req.to_department_id)
    if heads:
        notify(db, f"Transfer requested for asset {asset.name}", heads, current_user.id)
        db.commit()
        
    return StandardResponse(message="Transfer request created", data={"id": str(t_req.id)})

@router.put("/{id}/approve/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def approve_transfer(
    id: str = Path(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    transfer = db.query(Transfer).filter(Transfer.id == id).first()
    if not transfer:
        raise AppException(status_code=404, message="Transfer not found")
        
    if transfer.status != "PENDING":
        raise AppException(status_code=409, message="Transfer is not pending")
        
    if current_user.role == Role.DepartmentHead.value:
        if current_user.department_id != transfer.to_department_id:
            raise AppException(status_code=403, message="You can only approve incoming transfers to your department")
            
    asset = db.query(Asset).filter(Asset.id == transfer.asset_id).first()
    if not asset:
        raise AppException(status_code=404, message="Asset not found")
        
    if asset.department_id != transfer.from_department_id:
        raise AppException(status_code=409, message="Asset department has drifted since request")
            
    transfer.status = "APPROVED"
    transfer.resolved_at = datetime.utcnow()
    asset.department_id = transfer.to_department_id
    # Note: We do NOT change Asset.status per business rules
    
    db.commit()
    log_activity(db, "transfers", "approved", f"Approved transfer {id}", current_user.id)
    
    requester = db.query(User).filter(User.id == transfer.requested_by_id).first()
    if requester:
        notify(db, f"Your transfer request for asset {asset.name} was approved", [requester], current_user.id)
        db.commit()
        
    return StandardResponse(message="Transfer approved")

@router.put("/{id}/reject/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def reject_transfer(
    id: str = Path(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    transfer = db.query(Transfer).filter(Transfer.id == id).first()
    if not transfer:
        raise AppException(status_code=404, message="Transfer not found")
        
    if transfer.status != "PENDING":
        raise AppException(status_code=409, message="Transfer is not pending")
        
    if current_user.role == Role.DepartmentHead.value:
        if current_user.department_id != transfer.to_department_id:
            raise AppException(status_code=403, message="You can only reject incoming transfers to your department")
            
    transfer.status = "REJECTED"
    transfer.resolved_at = datetime.utcnow()
    db.commit()
    log_activity(db, "transfers", "rejected", f"Rejected transfer {id}", current_user.id)
    
    requester = db.query(User).filter(User.id == transfer.requested_by_id).first()
    if requester:
        notify(db, f"Your transfer request was rejected", [requester], current_user.id)
        db.commit()
        
    return StandardResponse(message="Transfer rejected")
