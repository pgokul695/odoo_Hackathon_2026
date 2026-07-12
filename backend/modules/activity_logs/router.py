from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from core.response import StandardResponse
from core.database import get_db
from core.dependencies import require_verified_and_assigned, require_role
from shared.enums import Role
from shared.models import ActivityLog
from typing import Optional
from uuid import UUID
from datetime import datetime

router = APIRouter(dependencies=[Depends(require_verified_and_assigned())])

@router.get("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Admin))])
async def list_activity_logs(
    user_id: Optional[UUID] = Query(None),
    module: Optional[str] = Query(None),
    date_from: Optional[datetime] = Query(None),
    date_to: Optional[datetime] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(ActivityLog)
    
    if user_id:
        query = query.filter(ActivityLog.user_id == user_id)
    if module:
        query = query.filter(ActivityLog.module == module)
    if date_from:
        query = query.filter(ActivityLog.created_at >= date_from)
    if date_to:
        query = query.filter(ActivityLog.created_at <= date_to)
        
    logs = query.order_by(ActivityLog.created_at.desc()).all()
    data = [{
        "id": str(l.id),
        "module": l.module,
        "action": l.action,
        "details": l.details,
        "user_id": str(l.user_id),
        "created_at": l.created_at.isoformat()
    } for l in logs]
    return StandardResponse(data=data)
