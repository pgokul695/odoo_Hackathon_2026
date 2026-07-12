from fastapi import APIRouter, Depends, Path, Query
from sqlalchemy.orm import Session
from core.response import StandardResponse
from core.database import get_db
from core.dependencies import require_verified_and_assigned, require_role
from core.security import get_current_user
from core.exceptions import AppException
from core.utils import log_activity
from shared.enums import Role
from shared.models import MaintenanceRequest, MaintenanceLog, Asset, User
from modules.assets.services import AssetStateService
from pydantic import BaseModel
from typing import Optional
from uuid import UUID

router = APIRouter(dependencies=[Depends(require_verified_and_assigned())])

class MaintenanceCreate(BaseModel):
    asset_id: UUID

class MaintenanceComplete(BaseModel):
    resolution_notes: str

@router.get("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def list_maintenance(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(MaintenanceRequest)
    
    if current_user.role == Role.Employee.value:
        query = query.filter(MaintenanceRequest.employee_id == current_user.id)
    elif current_user.role == Role.DepartmentHead.value:
        query = query.filter(MaintenanceRequest.department_id == current_user.department_id)
        
    requests = query.offset(skip).limit(limit).all()
    data = [{
        "id": str(r.id), 
        "asset_id": str(r.asset_id), 
        "employee_id": str(r.employee_id),
        "department_id": str(r.department_id) if r.department_id else None,
        "status": r.status,
        "resolution_notes": r.resolution_notes
    } for r in requests]
    return StandardResponse(data=data)

@router.post("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def create_maintenance(
    req: MaintenanceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    asset = db.query(Asset).filter(Asset.id == req.asset_id).first()
    if not asset:
        raise AppException(status_code=404, message="Asset not found")
        
    if asset.status in ["RETIRED", "UNDER_MAINTENANCE"]:
        raise AppException(status_code=400, message="Asset is not eligible for maintenance")
        
    open_request = db.query(MaintenanceRequest).filter(
        MaintenanceRequest.asset_id == asset.id,
        MaintenanceRequest.status.in_(["REQUESTED", "APPROVED"])
    ).first()
    
    if open_request:
        raise AppException(status_code=409, message="Asset already has an open maintenance request")
        
    m_req = MaintenanceRequest(
        asset_id=asset.id,
        employee_id=current_user.id,
        department_id=current_user.department_id,
        status="REQUESTED"
    )
    db.add(m_req)
    db.commit()
    
    log = MaintenanceLog(request_id=m_req.id, action="REQUESTED")
    db.add(log)
    db.commit()
    
    log_activity(db, "maintenance", "created", f"Raised maintenance request {m_req.id}", current_user.id)
    return StandardResponse(message="Maintenance request created", data={"id": str(m_req.id)})

@router.put("/{id}/approve/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.AssetManager, Role.Admin))])
async def approve_maintenance(
    id: str = Path(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    req = db.query(MaintenanceRequest).filter(MaintenanceRequest.id == id).first()
    if not req:
        raise AppException(status_code=404, message="Request not found")
        
    if req.status != "REQUESTED":
        raise AppException(status_code=409, message="Only REQUESTED maintenance can be approved")
        
    asset = db.query(Asset).filter(Asset.id == req.asset_id).first()
    if not asset:
        raise AppException(status_code=404, message="Asset not found")
        
    req.status = "APPROVED"
    db.add(MaintenanceLog(request_id=req.id, action="APPROVED"))
    
    AssetStateService.transition(asset, "UNDER_MAINTENANCE", db, current_user.id)
    
    db.commit()
    log_activity(db, "maintenance", "approved", f"Approved maintenance request {id}", current_user.id)
    return StandardResponse(message="Request approved")

@router.put("/{id}/reject/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.AssetManager, Role.Admin))])
async def reject_maintenance(
    id: str = Path(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    req = db.query(MaintenanceRequest).filter(MaintenanceRequest.id == id).first()
    if not req:
        raise AppException(status_code=404, message="Request not found")
        
    if req.status != "REQUESTED":
        raise AppException(status_code=409, message="Only REQUESTED maintenance can be rejected")
        
    req.status = "REJECTED"
    db.add(MaintenanceLog(request_id=req.id, action="REJECTED"))
    db.commit()
    log_activity(db, "maintenance", "rejected", f"Rejected maintenance request {id}", current_user.id)
    return StandardResponse(message="Request rejected")

@router.put("/{id}/complete/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.AssetManager, Role.Admin))])
async def complete_maintenance(
    payload: MaintenanceComplete,
    id: str = Path(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    req = db.query(MaintenanceRequest).filter(MaintenanceRequest.id == id).first()
    if not req:
        raise AppException(status_code=404, message="Request not found")
        
    if req.status != "APPROVED":
        raise AppException(status_code=409, message="Only APPROVED maintenance can be completed")
        
    if not payload.resolution_notes or not payload.resolution_notes.strip():
        raise AppException(status_code=400, message="resolution_notes is required")
        
    asset = db.query(Asset).filter(Asset.id == req.asset_id).first()
    if not asset:
        raise AppException(status_code=404, message="Asset not found")
        
    req.status = "COMPLETED"
    req.resolution_notes = payload.resolution_notes
    db.add(MaintenanceLog(request_id=req.id, action="COMPLETED", notes=payload.resolution_notes))
    
    AssetStateService.transition(asset, "AVAILABLE", db, current_user.id)
    
    db.commit()
    log_activity(db, "maintenance", "completed", f"Completed maintenance request {id}", current_user.id)
    return StandardResponse(message="Request completed")

@router.get("/{id}/logs", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def get_maintenance_logs(
    id: str = Path(...),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    req = db.query(MaintenanceRequest).filter(MaintenanceRequest.id == id).first()
    if not req:
        raise AppException(status_code=404, message="Request not found")
        
    if current_user.role == Role.Employee.value and req.employee_id != current_user.id:
        raise AppException(status_code=404, message="Request not found")
    elif current_user.role == Role.DepartmentHead.value and req.department_id != current_user.department_id:
        raise AppException(status_code=404, message="Request not found")
        
    logs = db.query(MaintenanceLog).filter(MaintenanceLog.request_id == id).order_by(MaintenanceLog.created_at).offset(skip).limit(limit).all()
    data = [{"id": str(l.id), "action": l.action, "notes": l.notes, "created_at": l.created_at.isoformat()} for l in logs]
    return StandardResponse(data=data)
