from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.response import StandardResponse
from core.database import get_db
from core.dependencies import require_verified_and_assigned, require_role
from shared.enums import Role
from shared.models import Department

from pydantic import BaseModel
from typing import Optional

router = APIRouter(dependencies=[Depends(require_verified_and_assigned())])

class DepartmentCreate(BaseModel):
    name: str

class DepartmentUpdate(BaseModel):
    name: str


@router.get("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def list_departments(db: Session = Depends(get_db)):
    departments = db.query(Department).filter(Department.is_active == True).all()
    data = [{"id": str(d.id), "name": d.name} for d in departments]
    return StandardResponse(data=data)

@router.post("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Admin))])
async def create_department(req: DepartmentCreate, db: Session = Depends(get_db)):
    dept = Department(name=req.name)
    db.add(dept)
    db.commit()
    return StandardResponse(message="Department created", data={"id": str(dept.id), "name": dept.name})

@router.put("/{id}", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Admin))])
async def update_department(id: str, req: DepartmentUpdate, db: Session = Depends(get_db)):
    dept = db.query(Department).filter(Department.id == id, Department.is_active == True).first()
    if not dept:
        return StandardResponse(success=False, message="Department not found", meta={"status_code": 404})
    dept.name = req.name
    db.commit()
    return StandardResponse(message="Department updated", data={"id": str(dept.id), "name": dept.name})

@router.delete("/{id}", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Admin))])
async def delete_department(id: str, db: Session = Depends(get_db)):
    dept = db.query(Department).filter(Department.id == id, Department.is_active == True).first()
    if not dept:
        return StandardResponse(success=False, message="Department not found", meta={"status_code": 404})
    dept.is_active = False
    db.commit()
    return StandardResponse(message="Department deleted")
