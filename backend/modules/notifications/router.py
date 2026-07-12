from fastapi import APIRouter
from core.response import StandardResponse
from core.config import settings

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_notifications():
    if settings.USE_MOCK_DATA:
        return StandardResponse(data=[{"id": "mock-notif-1", "message": "Asset allocated to you", "read": False}])
    return StandardResponse(data=[])
