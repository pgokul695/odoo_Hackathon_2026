import httpx
from sqlalchemy.orm import Session
from shared.models import User, Notification, NotificationPreference
from shared.enums import Role
from uuid import UUID
import logging

logger = logging.getLogger(__name__)

class NotificationService:
    async def send_email(self, email: str, purpose: str, code: str):
        # Fire-and-forget dummy or simple httpx call
        try:
            async with httpx.AsyncClient() as client:
                await client.post("http://localhost:5978/api/send", json={
                    "to": [email],
                    "subject": f"OTP for {purpose}",
                    "body_html": f"Your code is {code}"
                })
        except Exception as e:
            logger.error(f"Failed to send email to {email}: {e}")

notification_service = NotificationService()

def department_heads(db: Session, department_id: UUID) -> list[User]:
    if not department_id:
        return []
    return db.query(User).filter(User.role == Role.DepartmentHead.value, User.department_id == department_id).all()

def asset_managers_and_admins(db: Session) -> list[User]:
    return db.query(User).filter(User.role.in_([Role.AssetManager.value, Role.Admin.value])).all()

def notify(db: Session, message: str, recipients: list[User], actor_id: UUID):
    for user in recipients:
        if user.id == actor_id:
            continue
            
        try:
            # 1. In-app notification
            notif = Notification(user_id=user.id, message=message)
            db.add(notif)
            
            # 2. Check preferences
            prefs = db.query(NotificationPreference).filter(NotificationPreference.user_id == user.id).first()
            email_enabled = prefs.email_enabled if prefs else True
            
            # 3. Best effort email
            if email_enabled:
                try:
                    with httpx.Client() as client:
                        client.post("http://localhost:5978/api/send", json={
                            "to": user.email,
                            "subject": "AssetFlow Notification",
                            "body": message
                        }, timeout=2.0)
                except Exception as e:
                    logger.warning(f"Failed to send email to {user.email}: {e}")
        except Exception as e:
            logger.error(f"Failed to process notification for {user.id}: {e}")
            
    # Note: caller is responsible for committing the transaction.
