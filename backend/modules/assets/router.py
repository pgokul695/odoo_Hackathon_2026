from fastapi import APIRouter
from core.response import StandardResponse
from core.config import settings

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_assets():
    if settings.USE_MOCK_DATA:
        return StandardResponse(data=[{"id": "mock-asset-1", "name": "MacBook Pro M3", "status": "Available"}])
    return StandardResponse(data=[])

@router.post("/", response_model=StandardResponse)
async def create_asset():
    return StandardResponse(data={"id": "new-asset-id"}, message="Asset created placeholder")

@router.get("/{id}", response_model=StandardResponse)
async def get_asset(id: str):
    if settings.USE_MOCK_DATA:
        return StandardResponse(data={"id": id, "name": "MacBook Pro M3", "status": "Available"})
    return StandardResponse(data={})
