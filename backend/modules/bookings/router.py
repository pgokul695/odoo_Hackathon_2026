from fastapi import APIRouter
from core.response import StandardResponse
from core.config import settings

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_bookings():
    if settings.USE_MOCK_DATA:
        return StandardResponse(data=[{"id": "mock-booking-1", "asset_id": "mock-asset-1", "employee_id": "mock-emp-1", "status": "Approved"}])
    return StandardResponse(data=[])

@router.post("/", response_model=StandardResponse)
async def create_booking():
    return StandardResponse(data={"id": "new-booking-id"}, message="Booking created placeholder")
