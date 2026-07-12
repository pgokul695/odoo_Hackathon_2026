from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from core.db import get_db
from core.response import StandardResponse
from core import models, schemas
import datetime

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_transfers(db: Session = Depends(get_db)):
    transfers = db.query(models.Transfer).order_by(models.Transfer.id.desc()).all()
    # Serialize to schemas.Transfer
    data = []
    for t in transfers:
        data.append({
            "id": t.id,
            "assetId": t.assetId,
            "fromDepartmentId": t.fromDepartmentId,
            "toDepartmentId": t.toDepartmentId,
            "status": t.status,
            "requestedDate": t.requestedDate,
            "approvedDate": t.approvedDate,
            "requestedBy": t.requestedBy
        })
    return StandardResponse(data=data)

@router.post("/", response_model=StandardResponse)
async def create_transfer(payload: dict, db: Session = Depends(get_db)):
    asset_id = payload.get("asset_id")
    to_department_id = payload.get("to_department_id")
    
    asset = db.query(models.Asset).filter(models.Asset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
        
    count = db.query(models.Transfer).count()
    new_id = f"TR-{str(count + 26).zfill(3)}"
    
    new_transfer = models.Transfer(
        id=new_id,
        assetId=asset_id,
        fromDepartmentId=asset.departmentId,
        toDepartmentId=to_department_id,
        status="Pending",
        requestedDate=datetime.date.today().isoformat(),
        requestedBy="Keerthana Vinod"
    )
    
    # Update asset history
    hist = list(asset.history or [])
    hist.append({
        "id": str(datetime.datetime.now().timestamp()),
        "date": datetime.date.today().isoformat(),
        "type": "Transfer Request",
        "description": f"Transfer requested from {asset.departmentId} to {to_department_id}",
        "performedBy": "Keerthana Vinod"
    })
    asset.history = hist
    asset.lastActivity = "Just now"
    
    db.add(new_transfer)
    db.commit()
    
    return StandardResponse(data={
        "id": new_transfer.id,
        "assetId": new_transfer.assetId,
        "fromDepartmentId": new_transfer.fromDepartmentId,
        "toDepartmentId": new_transfer.toDepartmentId,
        "status": new_transfer.status,
        "requestedDate": new_transfer.requestedDate,
        "approvedDate": new_transfer.approvedDate,
        "requestedBy": new_transfer.requestedBy
    }, message="Transfer requested successfully")

@router.put("/{id}/approve/", response_model=StandardResponse)
async def approve_transfer(id: str, db: Session = Depends(get_db)):
    transfer = db.query(models.Transfer).filter(models.Transfer.id == id).first()
    if not transfer:
        raise HTTPException(status_code=404, detail="Transfer request not found")
        
    transfer.status = "Approved"
    transfer.approvedDate = datetime.date.today().isoformat()
    
    asset = db.query(models.Asset).filter(models.Asset.id == transfer.assetId).first()
    if asset:
        old_dept = asset.departmentId
        asset.departmentId = transfer.toDepartmentId
        asset.assignedToId = "none"
        asset.status = "Available"
        asset.lastActivity = "Just now"
        
        hist = list(asset.history or [])
        hist.append({
            "id": str(datetime.datetime.now().timestamp()),
            "date": datetime.date.today().isoformat(),
            "type": "Transfer Approval",
            "description": f"Transfer approved. Department changed from {old_dept} to {transfer.toDepartmentId}",
            "performedBy": "Keerthana Vinod"
        })
        asset.history = hist
        
    db.commit()
    return StandardResponse(message="Transfer request approved successfully")

@router.put("/{id}/reject/", response_model=StandardResponse)
async def reject_transfer(id: str, db: Session = Depends(get_db)):
    transfer = db.query(models.Transfer).filter(models.Transfer.id == id).first()
    if not transfer:
        raise HTTPException(status_code=404, detail="Transfer request not found")
        
    transfer.status = "Rejected"
    
    asset = db.query(models.Asset).filter(models.Asset.id == transfer.assetId).first()
    if asset:
        hist = list(asset.history or [])
        hist.append({
            "id": str(datetime.datetime.now().timestamp()),
            "date": datetime.date.today().isoformat(),
            "type": "Transfer Rejected",
            "description": f"Transfer request {id} was rejected.",
            "performedBy": "Keerthana Vinod"
        })
        asset.history = hist
        asset.lastActivity = "Just now"
        
    db.commit()
    return StandardResponse(message="Transfer request rejected successfully")
