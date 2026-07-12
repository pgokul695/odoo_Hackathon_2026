from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.response import StandardResponse
from core.database import get_db
from core.dependencies import require_verified_and_assigned, require_role
from core.security import get_current_user, get_password_hash, verify_password
from core.exceptions import AppException
from core.utils import log_activity
from shared.enums import Role
from shared.models import User, OrganizationSettings
from pydantic import BaseModel

router = APIRouter(dependencies=[Depends(require_verified_and_assigned())])

class ProfileUpdate(BaseModel):
    name: str
    email: str

class PasswordUpdate(BaseModel):
    current_password: str
    new_password: str

class OrgSettingsUpdate(BaseModel):
    name: str
    logo_url: str = None
    timezone: str

@router.get("/profile/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def get_profile(current_user: User = Depends(get_current_user)):
    return StandardResponse(data={
        "id": str(current_user.id),
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role,
        "department_id": str(current_user.department_id) if current_user.department_id else None
    })

@router.put("/profile/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def update_profile(
    req: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    current_user.name = req.name
    current_user.email = req.email
    db.commit()
    log_activity(db, "settings", "updated_profile", "User updated profile", current_user.id)
    return StandardResponse(message="Profile updated")

@router.put("/password/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def update_password(
    req: PasswordUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not verify_password(req.current_password, current_user.hashed_password):
        raise AppException(status_code=400, message="Incorrect current password")
        
    current_user.hashed_password = get_password_hash(req.new_password)
    db.commit()
    log_activity(db, "settings", "updated_password", "User changed password", current_user.id)
    return StandardResponse(message="Password updated successfully")

@router.get("/organization/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Admin))])
async def get_org_settings(db: Session = Depends(get_db)):
    settings = db.query(OrganizationSettings).first()
    if not settings:
        settings = OrganizationSettings()
        db.add(settings)
        db.commit()
        db.refresh(settings)
        
    return StandardResponse(data={
        "name": settings.name,
        "logo_url": settings.logo_url,
        "timezone": settings.timezone
    })

@router.put("/organization/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Admin))])
async def update_org_settings(
    req: OrgSettingsUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    settings = db.query(OrganizationSettings).first()
    if not settings:
        settings = OrganizationSettings()
        db.add(settings)
        
    settings.name = req.name
    settings.logo_url = req.logo_url
    settings.timezone = req.timezone
    db.commit()
    log_activity(db, "settings", "updated_org", "Updated organization settings", current_user.id)
    return StandardResponse(message="Organization settings updated")
