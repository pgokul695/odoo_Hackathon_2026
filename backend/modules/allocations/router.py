from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.db import get_db
from core.response import StandardResponse
from core.config import settings
from core import models, schemas
import datetime

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_allocations(db: Session = Depends(get_db)):
    if settings.USE_MOCK_DATA:
        return StandardResponse(data=[{"id": "mock-alloc-1", "asset_id": "mock-asset-1", "employee_id": "mock-emp-1", "status": "Active"}])
    
    allocations = db.query(models.Allocation).all()
    # Serialize allocations
    data = []
    for al in allocations:
        data.append({
            "id": al.id,
            "assetId": al.assetId,
            "employeeId": al.employeeId,
            "allocatedDate": al.allocatedDate,
            "returnDate": al.returnDate,
            "status": al.status,
            "notes": al.notes
        })
    return StandardResponse(data=data)

@router.post("/", response_model=StandardResponse)
async def create_allocation(payload: dict, db: Session = Depends(get_db)):
    asset_id = payload.get("asset_id")
    employee_id = payload.get("employee_id")
    notes = payload.get("notes", "")

    asset = db.query(models.Asset).filter(models.Asset.id == asset_id).first()
    employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    if not asset or not employee:
        raise HTTPException(status_code=404, detail="Asset or Employee not found")

    count = db.query(models.Allocation).count()
    new_id = f"al-{count + 1}"

    new_alloc = models.Allocation(
        id=new_id,
        assetId=asset_id,
        employeeId=employee_id,
        allocatedDate=datetime.date.today().isoformat(),
        status="Active",
        notes=notes
    )

    # Update Asset status and history
    asset.assignedToId = employee_id
    asset.status = "Allocated"
    asset.lastActivity = "Just now"
    hist = list(asset.history or [])
    hist.append({
        "id": str(datetime.datetime.now().timestamp()),
        "date": datetime.date.today().isoformat(),
        "type": "Allocation",
        "description": f"Allocated to {employee.name}",
        "performedBy": "Keerthana Vinod"
    })
    asset.history = hist

    # Update Employee active asset count
    employee.activeAssetsCount += 1

    # Update Category allocated asset count
    category = db.query(models.Category).filter(models.Category.id == asset.categoryId).first()
    if category:
        category.allocatedAssets += 1

    db.add(new_alloc)
    db.commit()

    return StandardResponse(data={"id": new_alloc.id}, message="Allocation created successfully")
