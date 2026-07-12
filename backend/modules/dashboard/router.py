from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from core.response import StandardResponse
from core.database import get_db
from core.dependencies import require_verified_and_assigned, require_role
from shared.enums import Role
from shared.models import Asset, Allocation, Transfer, MaintenanceRequest, Audit, Booking
from datetime import datetime, timedelta

router = APIRouter(dependencies=[Depends(require_verified_and_assigned())])

@router.get("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Admin))])
async def get_dashboard(db: Session = Depends(get_db)):
    # 1. assets_by_status
    assets_by_status = dict(db.query(Asset.status, func.count(Asset.id)).group_by(Asset.status).all())
    total_assets = sum(assets_by_status.values())
    assets_by_status["total"] = total_assets
    
    # 2. active_allocations
    active_allocations = db.query(Allocation).filter(Allocation.status == "ACTIVE").count()
    
    # 3. pending_transfers
    pending_transfers = db.query(Transfer).filter(Transfer.status == "PENDING").count()
    
    # 4. open_maintenance_requests
    open_maintenance_requests = db.query(MaintenanceRequest).filter(MaintenanceRequest.status.in_(["REQUESTED", "APPROVED"])).count()
    
    # 5. open_audits
    open_audits = db.query(Audit).filter(Audit.status == "OPEN").count()
    
    # 6. upcoming_bookings
    now = datetime.utcnow()
    seven_days = now + timedelta(days=7)
    upcoming_bookings = db.query(Booking).filter(
        Booking.status == "CONFIRMED",
        Booking.start_time >= now,
        Booking.start_time <= seven_days
    ).count()
    
    # 7. assets_by_department
    assets_by_department = dict(db.query(Asset.department_id, func.count(Asset.id)).group_by(Asset.department_id).all())
    # stringify keys since department_id is UUID
    assets_by_department = {str(k) if k else "unassigned": v for k, v in assets_by_department.items()}
    
    return StandardResponse(data={
        "assets_by_status": assets_by_status,
        "active_allocations": active_allocations,
        "pending_transfers": pending_transfers,
        "open_maintenance_requests": open_maintenance_requests,
        "open_audits": open_audits,
        "upcoming_bookings": upcoming_bookings,
        "assets_by_department": assets_by_department
    })
