from fastapi import APIRouter
from core.response import StandardResponse
from core.config import settings

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_allocations():
    if settings.USE_MOCK_DATA:
        return StandardResponse(data=[{"id": "mock-alloc-1", "asset_id": "mock-asset-1", "employee_id": "mock-emp-1", "status": "Active"}])
    return StandardResponse(data=[])

@router.post("/", response_model=StandardResponse)
async def create_allocation():
    return StandardResponse(data={"id": "new-alloc-id"}, message="Allocation created placeholder")
