from sqlalchemy.orm import Session
from shared.models import ActivityLog
from uuid import UUID

def log_activity(db: Session, module: str, action: str, details: str, user_id: UUID):
    log = ActivityLog(
        module=module,
        action=action,
        details=details,
        user_id=user_id
    )
    db.add(log)
    db.commit()
