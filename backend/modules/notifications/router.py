from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.response import StandardResponse
from core.database import get_db
from core.dependencies import require_verified_and_assigned, require_role
from core.exceptions import AppException
from core.security import get_current_user
from shared.enums import Role
from shared.models import Notification, NotificationPreference, User
from pydantic import BaseModel

router = APIRouter(dependencies=[Depends(require_verified_and_assigned())])

class PrefsUpdate(BaseModel):
    email_enabled: bool
    push_enabled: bool


@router.get("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def list_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    notifications = db.query(Notification).filter(Notification.user_id == current_user.id).all()
    data = [{"id": str(n.id), "message": n.message, "is_read": n.is_read} for n in notifications]
    return StandardResponse(data=data)

@router.put("/{id}/read/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def read_notification(
    id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    notif = db.query(Notification).filter(Notification.id == id).first()
    if not notif or notif.user_id != current_user.id:
        raise AppException(status_code=404, message="Notification not found")
        
    notif.is_read = True
    db.commit()
    return StandardResponse(message="Notification marked as read")

@router.get("/preferences/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def get_preferences(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    prefs = db.query(NotificationPreference).filter(NotificationPreference.user_id == current_user.id).first()
    if not prefs:
        prefs = NotificationPreference(user_id=current_user.id)
        db.add(prefs)
        db.commit()
    
    return StandardResponse(data={
        "email_enabled": prefs.email_enabled,
        "push_enabled": prefs.push_enabled
    })

@router.put("/preferences/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def update_preferences(
    req: PrefsUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    prefs = db.query(NotificationPreference).filter(NotificationPreference.user_id == current_user.id).first()
    if not prefs:
        prefs = NotificationPreference(user_id=current_user.id)
        db.add(prefs)
        
    prefs.email_enabled = req.email_enabled
    prefs.push_enabled = req.push_enabled
    db.commit()
    return StandardResponse(message="Preferences updated")
