from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.db import get_db
from core.response import StandardResponse
from core.config import settings
from core import models, schemas
import datetime

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_bookings(db: Session = Depends(get_db)):
    if settings.USE_MOCK_DATA:
        return StandardResponse(data=[{"id": "mock-booking-1", "assetId": "mock-asset-1", "requesterName": "John"}])
    
    bookings = db.query(models.Booking).all()
    # Serialize bookings
    data = []
    for b in bookings:
        data.append({
            "id": b.id,
            "assetId": b.assetId,
            "requesterName": b.requesterName,
            "startDate": b.startDate,
            "endDate": b.endDate,
            "purpose": b.purpose,
            "status": b.status
        })
    return StandardResponse(data=data)

@router.post("/", response_model=StandardResponse)
async def create_booking(payload: dict, db: Session = Depends(get_db)):
    asset_id = payload.get("asset_id")
    start_time = payload.get("start_time")
    end_time = payload.get("end_time")

    asset = db.query(models.Asset).filter(models.Asset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")

    count = db.query(models.Booking).count()
    new_id = f"bk-{count + 1}"

    new_booking = models.Booking(
        id=new_id,
        assetId=asset_id,
        requesterName=payload.get("requester_name", "Keerthana Vinod"),
        startDate=start_time,
        endDate=end_time,
        purpose=payload.get("purpose", "Reservation"),
        status="Confirmed"
    )

    # Add booking history to asset
    hist = list(asset.history or [])
    hist.append({
        "id": str(datetime.datetime.now().timestamp()),
        "date": datetime.date.today().isoformat(),
        "type": "Booking",
        "description": f"Booked for: {new_booking.purpose}",
        "performedBy": new_booking.requesterName
    })
    asset.history = hist
    asset.lastActivity = "Just now"

    db.add(new_booking)
    db.commit()

    return StandardResponse(data={"id": new_booking.id}, message="Booking confirmed successfully")
