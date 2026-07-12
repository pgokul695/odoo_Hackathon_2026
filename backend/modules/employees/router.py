from fastapi import APIRouter, Depends, Path
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from uuid import UUID

from core.database import get_db
from core.response import StandardResponse
from core.exceptions import AppException
from core.dependencies import require_role, require_verified_and_assigned
from core.security import get_current_user
from shared.models import User, Department, ActivityLog
from shared.enums import Role

router = APIRouter()

class RoleAssignmentRequest(BaseModel):
    role: str
    department_id: Optional[UUID] = None

@router.get("/", response_model=StandardResponse)
async def list_employees(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_verified_and_assigned())
):
    users = db.query(User).all()
    # Mask hashed_password in response
    data = []
    for u in users:
        data.append({
            "id": str(u.id),
            "name": u.name,
            "email": u.email,
            "role": u.role,
            "department_id": str(u.department_id) if u.department_id else None,
            "email_verified_at": u.email_verified_at
        })
    return StandardResponse(data=data)

@router.get("/pending/", response_model=StandardResponse)
async def list_pending_employees(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(Role.Admin))
):
    users = db.query(User).filter(User.role == Role.User.value).all()
    data = []
    for u in users:
        data.append({
            "id": str(u.id),
            "name": u.name,
            "email": u.email,
            "role": u.role,
            "email_verified_at": u.email_verified_at
        })
    return StandardResponse(data=data)

@router.put("/{id}/role/", response_model=StandardResponse)
async def assign_role(
    req: RoleAssignmentRequest,
    id: UUID = Path(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(Role.Admin))
):
    # Validate role enum
    valid_roles = [r.value for r in Role]
    if req.role not in valid_roles:
        raise AppException(status_code=400, message="Invalid role specified.")
        
    user = db.query(User).filter(User.id == id).first()
    if not user:
        raise AppException(status_code=404, message="User not found.")
        
    if req.role in [Role.DepartmentHead.value, Role.Employee.value]:
        if not req.department_id:
            raise AppException(status_code=400, message=f"department_id is required for role {req.role}.")
            
    if req.department_id:
        dept = db.query(Department).filter(Department.id == req.department_id).first()
        if not dept:
            raise AppException(status_code=404, message="Department not found.")
            
    old_role = user.role
    user.role = req.role
    user.department_id = req.department_id
    
    # Log the action
    log = ActivityLog(
        module="organization",
        action="role_assigned",
        details=f"Changed role from {old_role} to {req.role}",
        user_id=current_user.id
    )
    db.add(log)
    db.commit()
    db.refresh(user)
    
    return StandardResponse(
        message="Role updated successfully.",
        data={
            "id": str(user.id),
            "role": user.role,
            "department_id": str(user.department_id) if user.department_id else None
        }
    )
