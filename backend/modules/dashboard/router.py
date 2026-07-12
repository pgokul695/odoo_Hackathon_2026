from fastapi import APIRouter
from core.response import StandardResponse
from core.config import settings

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def get_dashboard_metrics():
    if settings.USE_MOCK_DATA:
        return StandardResponse(data={"total_assets": 120, "active_allocations": 45, "pending_maintenance": 3})
    return StandardResponse(data={})
