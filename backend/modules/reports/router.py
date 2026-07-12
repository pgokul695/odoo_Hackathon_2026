from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.response import StandardResponse
from core.database import get_db
from core.dependencies import require_verified_and_assigned, require_role
from core.exceptions import AppException
from core.utils import log_activity
from core.security import get_current_user
from shared.enums import Role
from shared.models import Report, User, Asset, Allocation, Transfer, MaintenanceRequest, Audit, AuditResult, Booking
from pydantic import BaseModel
from typing import Dict, Any, Optional
from sqlalchemy import func
from datetime import datetime

router = APIRouter(dependencies=[Depends(require_verified_and_assigned())])

class ReportGenerate(BaseModel):
    report_type: str
    filters: Dict[str, Any] = {}


VALID_REPORT_TYPES = {
    "ASSET_INVENTORY": {"department_id", "status"},
    "ALLOCATION_HISTORY": {"date_from", "date_to", "department_id", "employee_id"},
    "TRANSFER_HISTORY": {"date_from", "date_to", "department_id"},
    "MAINTENANCE_SUMMARY": {"date_from", "date_to", "department_id"},
    "AUDIT_SUMMARY": {"date_from", "date_to", "audit_id"},
    "BOOKING_UTILIZATION": {"date_from", "date_to", "department_id"}
}

@router.get("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.AssetManager, Role.Admin))])
async def list_reports(
    skip: int = 0, 
    limit: int = 20,
    db: Session = Depends(get_db)
):
    reports = db.query(Report).order_by(Report.generated_at.desc()).offset(skip).limit(limit).all()
    data = [{
        "id": str(r.id), 
        "report_type": r.report_type,
        "filters": r.filters,
        "generated_by_id": str(r.generated_by_id),
        "generated_at": r.generated_at.isoformat() + "Z" if r.generated_at else None
    } for r in reports]
    return StandardResponse(data=data)

def parse_date(date_str: str) -> datetime:
    try:
        return datetime.fromisoformat(date_str.replace("Z", "+00:00")).replace(tzinfo=None)
    except:
        return None

@router.post("/generate/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.AssetManager, Role.Admin))])
async def generate_report(
    req: ReportGenerate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if req.report_type not in VALID_REPORT_TYPES:
        raise AppException(status_code=400, message=f"Invalid report_type: {req.report_type}")
        
    allowed_filters = VALID_REPORT_TYPES[req.report_type]
    for key in req.filters.keys():
        if key not in allowed_filters:
            raise AppException(status_code=400, message=f"Invalid filter {key} for report {req.report_type}")

    # Build the report output
    result_data = []
    f = req.filters
    
    date_from = parse_date(f.get("date_from")) if f.get("date_from") else None
    date_to = parse_date(f.get("date_to")) if f.get("date_to") else None
    
    if req.report_type == "ASSET_INVENTORY":
        q = db.query(Asset)
        if "department_id" in f: q = q.filter(Asset.department_id == f["department_id"])
        if "status" in f: q = q.filter(Asset.status == f["status"])
        assets = q.all()
        result_data = [{"id": str(a.id), "status": a.status, "department_id": str(a.department_id) if a.department_id else None} for a in assets]
        
    elif req.report_type == "ALLOCATION_HISTORY":
        q = db.query(Allocation).join(Asset)
        if date_from: q = q.filter(Allocation.allocated_at >= date_from)
        if date_to: q = q.filter(Allocation.allocated_at <= date_to)
        if "department_id" in f: q = q.filter(Asset.department_id == f["department_id"])
        if "employee_id" in f: q = q.filter(Allocation.employee_id == f["employee_id"])
        allocs = q.all()
        result_data = [{"asset_id": str(a.asset_id), "employee_id": str(a.employee_id), "allocated_at": a.allocated_at.isoformat() + "Z" if a.allocated_at else None, "returned_at": a.returned_at.isoformat() + "Z" if a.returned_at else None} for a in allocs]
        
    elif req.report_type == "TRANSFER_HISTORY":
        q = db.query(Transfer)
        if date_from: q = q.filter(Transfer.requested_at >= date_from)
        if date_to: q = q.filter(Transfer.requested_at <= date_to)
        if "department_id" in f: q = q.filter((Transfer.from_department_id == f["department_id"]) | (Transfer.to_department_id == f["department_id"]))
        transfers = q.all()
        result_data = [{"asset_id": str(t.asset_id), "from_department_id": str(t.from_department_id) if t.from_department_id else None, "to_department_id": str(t.to_department_id) if t.to_department_id else None, "status": t.status} for t in transfers]
        
    elif req.report_type == "MAINTENANCE_SUMMARY":
        q = db.query(MaintenanceRequest.status, func.count(MaintenanceRequest.id)).group_by(MaintenanceRequest.status)
        if date_from: q = q.filter(MaintenanceRequest.created_at >= date_from)
        if date_to: q = q.filter(MaintenanceRequest.created_at <= date_to)
        if "department_id" in f: q = q.filter(MaintenanceRequest.department_id == f["department_id"])
        counts = dict(q.all())
        result_data = {"counts_by_status": counts}
        
    elif req.report_type == "AUDIT_SUMMARY":
        q = db.query(AuditResult.result, func.count(AuditResult.id)).group_by(AuditResult.result)
        if date_from or date_to:
            q = q.join(Audit)
            if date_from: q = q.filter(Audit.created_at >= date_from)
            if date_to: q = q.filter(Audit.created_at <= date_to)
        if "audit_id" in f: q = q.filter(AuditResult.audit_id == f["audit_id"])
        counts = dict(q.all())
        result_data = {"counts_by_result": counts}
        
    elif req.report_type == "BOOKING_UTILIZATION":
        q = db.query(Booking.status, func.count(Booking.id)).group_by(Booking.status)
        if date_from or date_to or "department_id" in f:
            q = q.join(Asset)
        if date_from: q = q.filter(Booking.created_at >= date_from)
        if date_to: q = q.filter(Booking.created_at <= date_to)
        if "department_id" in f: q = q.filter(Asset.department_id == f["department_id"])
        counts = dict(q.all())
        total = sum(counts.values())
        result_data = {"total": total, "counts_by_status": counts}

    # Save metadata
    report = Report(
        report_type=req.report_type,
        filters=req.filters,
        generated_by_id=current_user.id,
        generated_at=datetime.utcnow()
    )
    db.add(report)
    db.commit()
    
    log_activity(db, "reports", "generated", f"Generated report {req.report_type}", current_user.id)
    return StandardResponse(
        message="Report generated",
        data=result_data
    )
