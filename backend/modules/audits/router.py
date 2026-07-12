from fastapi import APIRouter, Depends, Path
from sqlalchemy.orm import Session
from core.response import StandardResponse
from core.database import get_db
from core.dependencies import require_verified_and_assigned, require_role
from core.security import get_current_user
from core.exceptions import AppException
from core.utils import log_activity
from shared.enums import Role
from shared.models import Audit, AuditResult, User
from pydantic import BaseModel
from uuid import UUID

router = APIRouter(dependencies=[Depends(require_verified_and_assigned())])

class AuditCreate(BaseModel):
    name: str

class AuditResultSubmit(BaseModel):
    asset_id: UUID
    result: str # FOUND, MISSING, DAMAGED
    notes: str = None

@router.get("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.AssetManager, Role.Admin))])
async def list_audits(db: Session = Depends(get_db)):
    audits = db.query(Audit).all()
    data = [{"id": str(a.id), "name": a.name, "status": a.status} for a in audits]
    return StandardResponse(data=data)

@router.post("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Admin))])
async def create_audit(
    req: AuditCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    audit = Audit(name=req.name)
    db.add(audit)
    db.commit()
    log_activity(db, "audits", "created", f"Created audit cycle {audit.id}", current_user.id)
    return StandardResponse(message="Audit created", data={"id": str(audit.id)})

@router.get("/{id}", response_model=StandardResponse, dependencies=[Depends(require_role(Role.AssetManager, Role.Admin))])
async def get_audit(id: str = Path(...), db: Session = Depends(get_db)):
    audit = db.query(Audit).filter(Audit.id == id).first()
    if not audit:
        raise AppException(status_code=404, message="Audit not found")
    
    # We would include asset_ids in scope here depending on business logic, 
    # but for now we just return the audit detail.
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
        
    audit.status = "CLOSED"
    db.commit()
    log_activity(db, "audits", "closed", f"Closed audit cycle {id}", current_user.id)
    return StandardResponse(message="Audit closed")

@router.get("/{id}/results/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.AssetManager, Role.Admin))])
async def get_audit_results(id: str = Path(...), db: Session = Depends(get_db)):
    audit = db.query(Audit).filter(Audit.id == id).first()
    if not audit:
        raise AppException(status_code=404, message="Audit not found")
        
    results = db.query(AuditResult).filter(AuditResult.audit_id == id).all()
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
        raise AppException(status_code=400, message="Cannot submit results to a closed audit")
        
    res = AuditResult(
        audit_id=audit.id,
        asset_id=req.asset_id,
        result=req.result,
        notes=req.notes
    )
    db.add(res)
    db.commit()
    log_activity(db, "audits", "result_submitted", f"Submitted result for asset {req.asset_id} in audit {id}", current_user.id)
    return StandardResponse(message="Audit result submitted", data={"id": str(res.id)})
