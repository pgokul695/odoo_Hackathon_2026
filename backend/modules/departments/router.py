from fastapi import APIRouter
from core.response import StandardResponse
from core.config import settings

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_departments():
    if settings.USE_MOCK_DATA:
        return StandardResponse(data=[{"id": "mock-dept-1", "name": "Engineering"}])
    return StandardResponse(data=[])
