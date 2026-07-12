from fastapi import APIRouter
from core.response import StandardResponse
from core.config import settings

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_audits():
    if settings.USE_MOCK_DATA:
        return StandardResponse(data=[{"id": "mock-audit-1", "name": "Annual Q1 Audit", "status": "In Progress"}])
    return StandardResponse(data=[])
