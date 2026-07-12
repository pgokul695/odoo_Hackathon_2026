from fastapi import APIRouter, Depends, Path, Query
from sqlalchemy.orm import Session
from core.response import StandardResponse
from core.database import get_db
from core.dependencies import require_verified_and_assigned, require_role
from core.security import get_current_user
from core.exceptions import AppException
from core.utils import log_activity
from shared.enums import Role
from shared.models import Audit, AuditResult, Asset, User
from modules.assets.services import AssetStateService
from modules.notifications.service import notify, department_heads
from pydantic import BaseModel
from typing import Optional
from uuid import UUID

router = APIRouter(dependencies=[Depends(require_verified_and_assigned())])

class AuditCreate(BaseModel):
    name: str

class AuditResultSubmit(BaseModel):
    asset_id: UUID
    result: str # FOUND, MISSING, DAMAGED
    notes: Optional[str] = None

@router.get("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.AssetManager, Role.Admin))])
async def list_audits(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db)
):
    audits = db.query(Audit).offset(skip).limit(limit).all()
    data = [{"id": str(a.id), "name": a.name, "status": a.status} for a in audits]
    return StandardResponse(data=data)

@router.post("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Admin))])
async def create_audit(
    req: AuditCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    audit = Audit(name=req.name, status="OPEN")
    db.add(audit)
    db.commit()
    log_activity(db, "audits", "created", f"Created audit cycle {audit.id}", current_user.id)
    return StandardResponse(message="Audit created", data={"id": str(audit.id)})

@router.get("/{id}", response_model=StandardResponse, dependencies=[Depends(require_role(Role.AssetManager, Role.Admin))])
async def get_audit(id: str = Path(...), db: Session = Depends(get_db)):
    audit = db.query(Audit).filter(Audit.id == id).first()
    if not audit:
        raise AppException(status_code=404, message="Audit not found")
    
    return StandardResponse(data={"id": str(audit.id), "name": audit.name, "status": audit.status})

@router.put("/{id}/close/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Admin))])
async def close_audit(
    id: str = Path(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    audit = db.query(Audit).filter(Audit.id == id).first()
    if not audit:
        raise AppException(status_code=404, message="Audit not found")
        
    if audit.status == "CLOSED":
        raise AppException(status_code=409, message="Audit is already closed")
        
    audit.status = "CLOSED"
    db.commit()
    log_activity(db, "audits", "closed", f"Closed audit cycle {id}", current_user.id)
    return StandardResponse(message="Audit closed")

@router.get("/{id}/results/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.AssetManager, Role.Admin))])
async def get_audit_results(
    id: str = Path(...), 
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db)
):
    audit = db.query(Audit).filter(Audit.id == id).first()
    if not audit:
        raise AppException(status_code=404, message="Audit not found")
        
    results = db.query(AuditResult).filter(AuditResult.audit_id == id).offset(skip).limit(limit).all()
    data = [{
        "id": str(r.id),
        "audit_id": str(r.audit_id),
        "asset_id": str(r.asset_id),
        "result": r.result,
        "notes": r.notes,
        "recorded_at": r.recorded_at.isoformat()
    } for r in results]
    return StandardResponse(data=data)

@router.post("/{id}/results/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.AssetManager, Role.Admin))])
async def submit_audit_result(
    req: AuditResultSubmit,
    id: str = Path(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    audit = db.query(Audit).filter(Audit.id == id).first()
    if not audit:
        raise AppException(status_code=404, message="Audit not found")
        
    if audit.status == "CLOSED":
        raise AppException(status_code=409, message="Cannot submit results to a closed audit")
        
    asset = db.query(Asset).filter(Asset.id == req.asset_id).first()
    if not asset:
        raise AppException(status_code=404, message="Asset not found")
        
    existing_result = db.query(AuditResult).filter(
        AuditResult.audit_id == audit.id,
        AuditResult.asset_id == asset.id
    ).first()
    
    if existing_result:
        raise AppException(status_code=409, message="A result for this asset has already been submitted in this audit")
        
    res = AuditResult(
        audit_id=audit.id,
        asset_id=req.asset_id,
        result=req.result,
        notes=req.notes
    )
    db.add(res)
    
    if asset.status != "RETIRED":
        if req.result in ["DAMAGED", "MISSING"]:
            # State transition if currently AVAILABLE or ALLOCATED
            # Note: The prompt doesn't strictly say it has to be AVAILABLE or ALLOCATED, 
            # it just says if DAMAGED or MISSING -> UNDER_MAINTENANCE.
            # But AssetStateService enforces valid transitions.
            # So if it's already UNDER_MAINTENANCE, we don't need to transition again.
            if asset.status != "UNDER_MAINTENANCE":
                AssetStateService.transition(asset, "UNDER_MAINTENANCE", db, current_user.id)
            
    db.commit()
    log_activity(db, "audits", "result_submitted", f"Submitted result for asset {req.asset_id} in audit {id}", current_user.id)
    
    if req.result in ["DAMAGED", "MISSING"]:
        heads = department_heads(db, asset.department_id)
        if heads:
            notify(db, f"Asset {asset.name} reported {req.result} during audit", heads, current_user.id)
            db.commit()
            
    return StandardResponse(message="Audit result submitted", data={"id": str(res.id)})
