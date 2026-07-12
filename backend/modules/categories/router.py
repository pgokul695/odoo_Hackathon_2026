from fastapi import APIRouter
from core.response import StandardResponse
from core.config import settings

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_categories():
    if settings.USE_MOCK_DATA:
        return StandardResponse(data=[{"id": "mock-cat-1", "name": "Laptops", "description": "Company laptops"}])
    return StandardResponse(data=[])
