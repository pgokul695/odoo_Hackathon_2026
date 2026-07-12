from fastapi import APIRouter
from core.response import StandardResponse
from core.config import settings

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_maintenance():
    if settings.USE_MOCK_DATA:
        return StandardResponse(data=[{"id": "mock-maint-1", "asset_id": "mock-asset-1", "issue": "Screen broken", "status": "Pending"}])
    return StandardResponse(data=[])
