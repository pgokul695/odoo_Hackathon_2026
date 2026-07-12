from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.db import get_db
from core.response import StandardResponse
from core.config import settings
from core import models, schemas
import datetime

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_assets(db: Session = Depends(get_db)):
    if settings.USE_MOCK_DATA:
        return StandardResponse(data=[{"id": "mock-asset-1", "name": "MacBook Pro M3", "status": "Available"}])
    
    assets = db.query(models.Asset).all()
    # Serialize assets
    data = []
    for a in assets:
        data.append({
            "id": a.id,
            "name": a.name,
            "categoryId": a.categoryId,
            "departmentId": a.departmentId,
            "assignedToId": a.assignedToId,
            "status": a.status,
            "purchaseDate": a.purchaseDate,
            "purchaseValue": a.purchaseValue,
            "lastActivity": a.lastActivity,
            "serialNumber": a.serialNumber,
            "notes": a.notes,
            "history": a.history,
            "attachments": a.attachments
        })
    return StandardResponse(data=data)

@router.post("/", response_model=StandardResponse)
async def create_asset(payload: dict, db: Session = Depends(get_db)):
    # Generate ID
    count = db.query(models.Asset).count()
    new_id = f"AST-{str(count + 1).zfill(3)}"
    
    cat_id = payload.get("categoryId")
    category = db.query(models.Category).filter(models.Category.id == cat_id).first()
    if category:
        category.totalAssets += 1
        if payload.get("status") == "Allocated":
            category.allocatedAssets += 1

    new_asset = models.Asset(
        id=new_id,
        name=payload.get("name"),
        categoryId=cat_id,
        departmentId=payload.get("departmentId"),
        assignedToId=payload.get("assignedToId", "none"),
        status=payload.get("status", "Available"),
        purchaseDate=payload.get("purchaseDate"),
        purchaseValue=float(payload.get("purchaseValue", 0.0) or 0.0),
        lastActivity="Just now",
        serialNumber=payload.get("serialNumber", ""),
        notes=payload.get("notes"),
        history=[{
            "id": str(datetime.datetime.now().timestamp()),
            "date": datetime.date.today().isoformat(),
            "type": "Registration",
            "description": f"Registered asset {payload.get('name')}",
            "performedBy": "Keerthana Vinod"
        }],
        attachments=[]
    )
    db.add(new_asset)
    db.commit()
    return StandardResponse(data={"id": new_asset.id, "name": new_asset.name}, message="Asset created successfully")

@router.get("/{id}", response_model=StandardResponse)
async def get_asset(id: str, db: Session = Depends(get_db)):
    if settings.USE_MOCK_DATA:
        return StandardResponse(data={"id": id, "name": "MacBook Pro M3", "status": "Available"})
        
    a = db.query(models.Asset).filter(models.Asset.id == id).first()
    if not a:
        raise HTTPException(status_code=404, detail="Asset not found")
        
    data = {
        "id": a.id,
        "name": a.name,
        "categoryId": a.categoryId,
        "departmentId": a.departmentId,
        "assignedToId": a.assignedToId,
        "status": a.status,
        "purchaseDate": a.purchaseDate,
        "purchaseValue": a.purchaseValue,
        "lastActivity": a.lastActivity,
        "serialNumber": a.serialNumber,
        "notes": a.notes,
        "history": a.history,
        "attachments": a.attachments
    }
    return StandardResponse(data=data)

@router.put("/{id}", response_model=StandardResponse)
async def update_asset(id: str, payload: dict, db: Session = Depends(get_db)):
    asset = db.query(models.Asset).filter(models.Asset.id == id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
        
    hist = list(asset.history or [])
    updated_fields = []
    
    if "name" in payload and payload["name"]:
        asset.name = payload["name"]
        updated_fields.append("name")
    if "department_id" in payload and payload["department_id"]:
        asset.departmentId = payload["department_id"]
        updated_fields.append("departmentId")
    if "status" in payload and payload["status"]:
        asset.status = payload["status"]
        updated_fields.append("status")
        
    if updated_fields:
        hist.append({
            "id": str(datetime.datetime.now().timestamp()),
            "date": datetime.date.today().isoformat(),
            "type": "Update",
            "description": f"Updated details: {', '.join(updated_fields)}",
            "performedBy": "Keerthana Vinod"
        })
        asset.history = hist
        asset.lastActivity = "Just now"
        
    db.commit()
    return StandardResponse(message="Asset updated successfully")
