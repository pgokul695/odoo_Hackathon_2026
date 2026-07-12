from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.db import get_db
from core.response import StandardResponse
from core.config import settings
from core import models

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_employees(db: Session = Depends(get_db)):
    if settings.USE_MOCK_DATA:
        return StandardResponse(data=[{"id": "mock-emp-1", "name": "John Doe", "email": "john@test.com"}])
    
    employees = db.query(models.Employee).all()
    # Serialize employees
    data = []
    for e in employees:
        # Dynamic activeAssetsCount based on Asset DB records
        active_count = db.query(models.Asset).filter(models.Asset.assignedToId == e.id, models.Asset.status == "Allocated").count()
        data.append({
            "id": e.id,
            "name": e.name,
            "email": e.email,
            "role": e.role,
            "departmentId": e.departmentId,
            "activeAssetsCount": active_count if active_count > 0 else e.activeAssetsCount
        })
    return StandardResponse(data=data)
