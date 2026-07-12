from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.response import StandardResponse
from core.database import get_db
from core.dependencies import require_verified_and_assigned, require_role
from core.utils import log_activity
from core.security import get_current_user
from shared.enums import Role
from shared.models import Report, User
from pydantic import BaseModel
from typing import Dict, Any

router = APIRouter(dependencies=[Depends(require_verified_and_assigned())])

class ReportGenerate(BaseModel):
    report_type: str
    filters: Dict[str, Any] = {}


@router.get("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.AssetManager, Role.Admin))])
async def list_reports(db: Session = Depends(get_db)):
    reports = db.query(Report).all()
    data = [{"id": str(r.id), "title": r.title} for r in reports]
    return StandardResponse(data=data)

@router.post("/generate/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.AssetManager, Role.Admin))])
async def generate_report(
    req: ReportGenerate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    log_activity(db, "reports", "generated", f"Generated report of type {req.report_type}", current_user.id)
    return StandardResponse(
        message="Report generated",
        data={"download_url": f"https://assetflow.local/reports/download/{req.report_type}?temp=123"}
    )
