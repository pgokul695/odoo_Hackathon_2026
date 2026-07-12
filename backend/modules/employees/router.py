from fastapi import APIRouter
from core.response import StandardResponse
from core.config import settings

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_employees():
    if settings.USE_MOCK_DATA:
        return StandardResponse(data=[{"id": "mock-emp-1", "name": "Alice Smith", "email": "alice@example.com"}])
    return StandardResponse(data=[])
