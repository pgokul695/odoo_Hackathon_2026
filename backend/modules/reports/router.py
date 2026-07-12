from fastapi import APIRouter
from core.response import StandardResponse
from core.config import settings

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_reports():
    if settings.USE_MOCK_DATA:
        return StandardResponse(data=[{"id": "mock-report-1", "title": "Asset Utilization Q1", "type": "Utilization"}])
    return StandardResponse(data=[])
