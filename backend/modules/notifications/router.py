from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.db import get_db
from core.response import StandardResponse
from core.config import settings
from core import models, schemas

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_notifications(db: Session = Depends(get_db)):
    if settings.USE_MOCK_DATA:
        return StandardResponse(data=[{"id": "mock-notif-1", "message": "Asset allocated to you", "read": False}])
    
    notifications = db.query(models.Notification).order_by(models.Notification.id.desc()).all()
    # Serialize notifications
    data = []
    for n in notifications:
        data.append({
            "id": n.id,
            "category": n.category,
            "message": n.message,
            "timestamp": n.timestamp,
            "read": n.read
        })
    return StandardResponse(data=data)

@router.put("/{id}/read/", response_model=StandardResponse)
async def read_notification(id: str, db: Session = Depends(get_db)):
    notif = db.query(models.Notification).filter(models.Notification.id == id).first()
    if not notif:
        raise HTTPException(status_code=404, detail="Notification not found")
        
    notif.read = True
    db.commit()
    return StandardResponse(message="Notification marked as read")
