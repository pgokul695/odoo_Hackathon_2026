from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.db import get_db
from core.response import StandardResponse
from core.config import settings

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_reports(db: Session = Depends(get_db)):
    # Simple list of mock reports
    reports = [
        {"id": "rep-1", "title": "Asset Utilization Summary", "type": "Utilization", "createdDate": "2026-07-12"},
        {"id": "rep-2", "title": "Maintenance Expense Analysis", "type": "Financial", "createdDate": "2026-07-11"},
        {"id": "rep-3", "title": "Asset Audit Compliance Log", "type": "Audit", "createdDate": "2026-07-10"},
    ]
    return StandardResponse(data=reports)
