from fastapi import APIRouter, Depends
from core.response import StandardResponse
from core.dependencies import require_verified_and_assigned, require_role
from shared.enums import Role

router = APIRouter(dependencies=[Depends(require_verified_and_assigned())])

@router.get("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Admin))])
async def get_dashboard():
    return StandardResponse(data={"total_assets": 120, "active_allocations": 85, "pending_maintenance": 3})
