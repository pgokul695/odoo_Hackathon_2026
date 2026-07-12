from fastapi import APIRouter, Depends, Path
from sqlalchemy.orm import Session
from core.response import StandardResponse
from core.database import get_db
from core.dependencies import require_verified_and_assigned, require_role
from core.security import get_current_user
from core.exceptions import AppException
from core.utils import log_activity
from shared.enums import Role
from shared.models import MaintenanceRequest, MaintenanceLog, User
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
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(MaintenanceRequest)
    
    if current_user.role == Role.Employee.value:
        query = query.filter(MaintenanceRequest.employee_id == current_user.id)
    elif current_user.role == Role.DepartmentHead.value:
        query = query.filter(MaintenanceRequest.department_id == current_user.department_id)
        
    requests = query.all()
    data = [{"id": str(r.id), "asset_id": str(r.asset_id), "employee_id": str(r.employee_id), "status": r.status} for r in requests]
    return StandardResponse(data=data)

@router.post("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def create_maintenance(
    req: MaintenanceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    m_req = MaintenanceRequest(
        asset_id=req.asset_id,
        employee_id=current_user.id,
        department_id=current_user.department_id
    )
    db.add(m_req)
    db.commit()
    
    log = MaintenanceLog(request_id=m_req.id, action="CREATED")
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
        
    req.status = "APPROVED"
    db.add(MaintenanceLog(request_id=req.id, action="APPROVED"))
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
        
    req.status = "COMPLETED"
    req.resolution_notes = payload.resolution_notes
    db.add(MaintenanceLog(request_id=req.id, action="COMPLETED", notes=payload.resolution_notes))
    db.commit()
    log_activity(db, "maintenance", "completed", f"Completed maintenance request {id}", current_user.id)
    return StandardResponse(message="Request completed")

@router.get("/{id}/logs", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def get_maintenance_logs(
    id: str = Path(...),
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
        
    logs = db.query(MaintenanceLog).filter(MaintenanceLog.request_id == id).order_by(MaintenanceLog.created_at).all()
    data = [{"id": str(l.id), "action": l.action, "notes": l.notes, "created_at": l.created_at.isoformat()} for l in logs]
    return StandardResponse(data=data)
