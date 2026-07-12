from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.response import StandardResponse
from core.database import get_db
from core.dependencies import require_verified_and_assigned, require_role
from shared.enums import Role
from shared.models import Category

from pydantic import BaseModel
from typing import Optional

router = APIRouter(dependencies=[Depends(require_verified_and_assigned())])

class CategoryCreate(BaseModel):
    name: str

class CategoryUpdate(BaseModel):
    name: str


@router.get("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def list_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).filter(Category.is_active == True).all()
    data = [{"id": str(c.id), "name": c.name} for c in categories]
    return StandardResponse(data=data)

@router.post("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Admin))])
async def create_category(req: CategoryCreate, db: Session = Depends(get_db)):
    cat = Category(name=req.name)
    db.add(cat)
    db.commit()
    return StandardResponse(message="Category created", data={"id": str(cat.id), "name": cat.name})

@router.put("/{id}", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Admin))])
async def update_category(id: str, req: CategoryUpdate, db: Session = Depends(get_db)):
    cat = db.query(Category).filter(Category.id == id, Category.is_active == True).first()
    if not cat:
        return StandardResponse(success=False, message="Category not found", meta={"status_code": 404})
    cat.name = req.name
    db.commit()
    return StandardResponse(message="Category updated", data={"id": str(cat.id), "name": cat.name})

@router.delete("/{id}", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Admin))])
async def delete_category(id: str, db: Session = Depends(get_db)):
    cat = db.query(Category).filter(Category.id == id, Category.is_active == True).first()
    if not cat:
        return StandardResponse(success=False, message="Category not found", meta={"status_code": 404})
    cat.is_active = False
    db.commit()
    return StandardResponse(message="Category deleted")
