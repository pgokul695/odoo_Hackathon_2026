from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.db import get_db
from core.response import StandardResponse
from core.config import settings
from core import models, schemas
import datetime

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_maintenance(db: Session = Depends(get_db)):
    if settings.USE_MOCK_DATA:
        return StandardResponse(data=[{"id": "mock-maint-1", "assetId": "mock-asset-1", "issue": "Screen broken", "status": "Pending"}])
    
    maintenance = db.query(models.Maintenance).all()
    # Serialize maintenance
    data = []
    for m in maintenance:
        data.append({
            "id": m.id,
            "assetId": m.assetId,
            "issue": m.issue,
            "priority": m.priority,
            "status": m.status,
            "assignedTechnician": m.assignedTechnician,
            "createdDate": m.createdDate,
            "cost": m.cost
        })
    return StandardResponse(data=data)

@router.post("/", response_model=StandardResponse)
async def create_maintenance(payload: dict, db: Session = Depends(get_db)):
    asset_id = payload.get("asset_id")
    asset = db.query(models.Asset).filter(models.Asset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
        
    count = db.query(models.Maintenance).count()
    new_id = f"MR-{str(count + 13).zfill(3)}"
    
    new_m = models.Maintenance(
        id=new_id,
        assetId=asset_id,
        issue=payload.get("issue", "General repair and inspection request"),
        priority=payload.get("priority", "Medium"),
        status="Requested",
        assignedTechnician="None",
        createdDate=datetime.date.today().isoformat()
    )
    
    # Update Asset status and history
    asset.status = "Under Maintenance"
    asset.lastActivity = "Just now"
    hist = list(asset.history or [])
    hist.append({
        "id": str(datetime.datetime.now().timestamp()),
        "date": datetime.date.today().isoformat(),
        "type": "Maintenance Request",
        "description": f"Maintenance {new_id} created: {new_m.issue}",
        "performedBy": "Keerthana Vinod"
    })
    asset.history = hist
    
    db.add(new_m)
    db.commit()
    return StandardResponse(data={"id": new_m.id}, message="Maintenance ticket created successfully")

@router.put("/{id}/complete/", response_model=StandardResponse)
async def complete_maintenance(id: str, payload: dict, db: Session = Depends(get_db)):
    ticket = db.query(models.Maintenance).filter(models.Maintenance.id == id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Maintenance ticket not found")
        
    ticket.status = "Completed"
    
    asset = db.query(models.Asset).filter(models.Asset.id == ticket.assetId).first()
    if asset:
        hist = list(asset.history or [])
        hist.append({
            "id": str(datetime.datetime.now().timestamp()),
            "date": datetime.date.today().isoformat(),
            "type": "Maintenance Update",
            "description": f"Maintenance ticket {id} marked as Completed. Notes: {payload.get('resolution_notes', 'Resolved via UI completion')}",
            "performedBy": "Keerthana Vinod"
        })
        asset.history = hist
        
        # Move asset status back
        asset.status = "Allocated" if asset.assignedToId != "none" else "Available"
        asset.lastActivity = "Just now"
        
    db.commit()
    return StandardResponse(message="Maintenance ticket marked completed")

@router.put("/{id}/approve/", response_model=StandardResponse)
async def approve_maintenance(id: str, db: Session = Depends(get_db)):
    ticket = db.query(models.Maintenance).filter(models.Maintenance.id == id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Maintenance ticket not found")
        
    ticket.status = "Approved"
    
    asset = db.query(models.Asset).filter(models.Asset.id == ticket.assetId).first()
    if asset:
        hist = list(asset.history or [])
        hist.append({
            "id": str(datetime.datetime.now().timestamp()),
            "date": datetime.date.today().isoformat(),
            "type": "Maintenance Update",
            "description": f"Maintenance ticket {id} marked as Approved",
            "performedBy": "Keerthana Vinod"
        })
        asset.history = hist
        asset.lastActivity = "Just now"
        
    db.commit()
    return StandardResponse(message="Maintenance ticket marked approved")

@router.put("/{id}/reject/", response_model=StandardResponse)
async def reject_maintenance(id: str, db: Session = Depends(get_db)):
    ticket = db.query(models.Maintenance).filter(models.Maintenance.id == id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Maintenance ticket not found")
        
    ticket.status = "Rejected"
    
    asset = db.query(models.Asset).filter(models.Asset.id == ticket.assetId).first()
    if asset:
        hist = list(asset.history or [])
        hist.append({
            "id": str(datetime.datetime.now().timestamp()),
            "date": datetime.date.today().isoformat(),
            "type": "Maintenance Update",
            "description": f"Maintenance ticket {id} marked as Rejected",
            "performedBy": "Keerthana Vinod"
        })
        asset.history = hist
        asset.status = "Allocated" if asset.assignedToId != "none" else "Available"
        asset.lastActivity = "Just now"
        
    db.commit()
    return StandardResponse(message="Maintenance ticket marked rejected")
