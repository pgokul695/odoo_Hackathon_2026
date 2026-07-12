from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.db import get_db
from core.response import StandardResponse
from core.config import settings
from core import models, schemas
import datetime

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_audits(db: Session = Depends(get_db)):
    if settings.USE_MOCK_DATA:
        return StandardResponse(data=[{"id": "mock-audit-1", "assetId": "mock-asset-1", "auditorName": "Keerthana Vinod", "status": "Found"}])
    
    audits = db.query(models.Audit).all()
    # Serialize audits
    data = []
    for au in audits:
        data.append({
            "id": au.id,
            "assetId": au.assetId,
            "auditorName": au.auditorName,
            "auditDate": au.auditDate,
            "status": au.status,
            "notes": au.notes
        })
    return StandardResponse(data=data)

@router.post("/{id}/results/", response_model=StandardResponse)
async def submit_audit(id: str, payload: dict, db: Session = Depends(get_db)):
    asset_id = payload.get("asset_id")
    result = payload.get("result") # FOUND, MISSING, DAMAGED
    notes = payload.get("notes", "")

    asset = db.query(models.Asset).filter(models.Asset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")

    count = db.query(models.Audit).count()
    new_id = f"au-{count + 1}"

    status_map = {
        "FOUND": "Found",
        "MISSING": "Missing",
        "DAMAGED": "Damaged"
    }
    status = status_map.get(result, "Found")

    new_audit = models.Audit(
        id=new_id,
        assetId=asset_id,
        auditorName="Keerthana Vinod",
        auditDate=datetime.date.today().isoformat(),
        status=status,
        notes=notes
    )

    # Update asset status and history
    if status == 'Damaged':
        asset.status = 'Under Maintenance'
    elif status == 'Missing':
        asset.status = 'Retired'
        
    asset.lastActivity = "Just now"
    hist = list(asset.history or [])
    hist.append({
        "id": str(datetime.datetime.now().timestamp()),
        "date": datetime.date.today().isoformat(),
        "type": "Audit",
        "description": f"Asset audited: {status}. Notes: {notes or 'None'}",
        "performedBy": "Keerthana Vinod"
    })
    asset.history = hist

    db.add(new_audit)
    db.commit()

    return StandardResponse(data={"id": new_audit.id}, message="Audit results submitted successfully")
