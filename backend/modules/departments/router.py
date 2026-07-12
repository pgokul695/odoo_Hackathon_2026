from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.db import get_db
from core.response import StandardResponse
from core.config import settings
from core import models

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_departments(db: Session = Depends(get_db)):
    if settings.USE_MOCK_DATA:
        return StandardResponse(data=[{"id": "mock-dept-1", "name": "IT", "code": "IT"}])
    
    departments = db.query(models.Department).all()
    # Serialize departments
    data = []
    for d in departments:
        # Dynamic employeeCount calculation based on Employee DB records
        emp_count = db.query(models.Employee).filter(models.Employee.departmentId == d.id).count()
        data.append({
            "id": d.id,
            "name": d.name,
            "code": d.code,
            "manager": d.manager,
            "employeeCount": emp_count if emp_count > 0 else d.employeeCount,
            "budget": d.budget
        })
    return StandardResponse(data=data)
