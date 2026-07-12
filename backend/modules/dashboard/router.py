from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.db import get_db
from core.response import StandardResponse
from core.config import settings
from core import models

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def get_dashboard_metrics(db: Session = Depends(get_db)):
    if settings.USE_MOCK_DATA:
        return StandardResponse(data={"total_assets": 120, "active_allocations": 45, "pending_maintenance": 3})
    
    total_assets = db.query(models.Asset).count()
    active_allocations = db.query(models.Asset).filter(models.Asset.status == "Allocated").count()
    pending_maint = db.query(models.Maintenance).filter(models.Maintenance.status != "Completed").count()
    
    data = {
        "total_assets": total_assets,
        "active_allocations": active_allocations,
        "pending_maintenance": pending_maint
    }
    return StandardResponse(data=data)
