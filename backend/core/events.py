from core.utils import log_activity
from sqlalchemy.orm import Session
from uuid import UUID

def dispatch(event_name: str, data: dict, db: Session, user_id: UUID = None):
    """
    Lightweight event dispatcher. 
    Currently sinks events into the ActivityLog if a user_id is provided,
    and logs them to the console for debugging/audit trails.
    """
    print(f"[EVENT DISPATCHED] {event_name}: {data}")
    
    if user_id:
        details = f"Event: {event_name}. Data: {data}"
        log_activity(db, module="system_events", action=event_name, details=details, user_id=user_id)
