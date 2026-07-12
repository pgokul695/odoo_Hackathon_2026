from fastapi import APIRouter, Depends, Path, UploadFile, File
from sqlalchemy.orm import Session
from core.response import StandardResponse
from core.database import get_db
from core.dependencies import require_verified_and_assigned, require_role, check_department_scope
from core.security import get_current_user
from core.exceptions import AppException
from core.utils import log_activity
from shared.enums import Role
from shared.models import Asset, Allocation, MaintenanceRequest, User
from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from modules.assets.services import AssetStateService

router = APIRouter(dependencies=[Depends(require_verified_and_assigned())])

class AssetUpdate(BaseModel):
    name: Optional[str] = None
    department_id: Optional[UUID] = None
    status: Optional[str] = None

@router.get("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def list_assets(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Asset).filter(Asset.is_active == True)
    
    if current_user.role == Role.Employee.value:
        query = query.join(Allocation).filter(Allocation.employee_id == current_user.id)
    elif current_user.role == Role.DepartmentHead.value:
        query = query.filter(Asset.department_id == current_user.department_id)
        
    assets = query.all()
    data = [{"id": str(a.id), "name": a.name, "department_id": str(a.department_id) if a.department_id else None, "status": a.status} for a in assets]
    return StandardResponse(data=data)

@router.post("/", response_model=StandardResponse, dependencies=[Depends(require_role(Role.AssetManager, Role.Admin))])
async def create_asset():
    return StandardResponse(data={"id": "new-asset-id"}, message="Asset created placeholder")

@router.get("/{id}", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def get_asset(
    id: str = Path(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    asset = db.query(Asset).filter(Asset.id == id, Asset.is_active == True).first()
    if not asset:
        raise AppException(status_code=404, message="Asset not found")
        
    if current_user.role == Role.Employee.value:
        alloc = db.query(Allocation).filter(Allocation.asset_id == asset.id, Allocation.employee_id == current_user.id).first()
        if not alloc:
            raise AppException(status_code=404, message="Asset not found")
    elif current_user.role == Role.DepartmentHead.value:
        try:
            check_department_scope(current_user, asset.department_id)
        except AppException:
            raise AppException(status_code=404, message="Asset not found")
            
    return StandardResponse(data={"id": str(asset.id), "name": asset.name, "department_id": str(asset.department_id) if asset.department_id else None, "status": asset.status})

@router.put("/{id}", response_model=StandardResponse, dependencies=[Depends(require_role(Role.AssetManager, Role.Admin))])
async def update_asset(
    req: AssetUpdate,
    id: str = Path(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    asset = db.query(Asset).filter(Asset.id == id, Asset.is_active == True).first()
    if not asset:
        raise AppException(status_code=404, message="Asset not found")
        
    if req.name is not None:
        asset.name = req.name
    if req.department_id is not None:
        asset.department_id = req.department_id
    if req.status is not None:
        AssetStateService.transition(asset, req.status, db, current_user.id)
        
    log_activity(db, "assets", "updated", f"Updated asset {id}", current_user.id)
    db.commit()
    return StandardResponse(message="Asset updated")

@router.delete("/{id}", response_model=StandardResponse, dependencies=[Depends(require_role(Role.AssetManager, Role.Admin))])
async def delete_asset(
    id: str = Path(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    asset = db.query(Asset).filter(Asset.id == id, Asset.is_active == True).first()
    if not asset:
        raise AppException(status_code=404, message="Asset not found")
        
    asset.is_active = False
    AssetStateService.transition(asset, "RETIRED", db, current_user.id)
    
    db.commit()
    log_activity(db, "assets", "retired", f"Retired asset {id}", current_user.id)
    return StandardResponse(message="Asset retired")

@router.get("/{id}/allocations", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def get_asset_allocations(
    id: str = Path(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Same scope check as get_asset
    asset = db.query(Asset).filter(Asset.id == id, Asset.is_active == True).first()
    if not asset:
        raise AppException(status_code=404, message="Asset not found")
        
    if current_user.role == Role.Employee.value:
        alloc = db.query(Allocation).filter(Allocation.asset_id == asset.id, Allocation.employee_id == current_user.id).first()
        if not alloc:
            raise AppException(status_code=404, message="Asset not found")
    elif current_user.role == Role.DepartmentHead.value:
        try:
            check_department_scope(current_user, asset.department_id)
        except AppException:
            raise AppException(status_code=404, message="Asset not found")

    allocations = db.query(Allocation).filter(Allocation.asset_id == id).all()
    data = [{"id": str(a.id), "employee_id": str(a.employee_id)} for a in allocations]
    return StandardResponse(data=data)

@router.get("/{id}/maintenance", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def get_asset_maintenance(
    id: str = Path(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Same scope check
    asset = db.query(Asset).filter(Asset.id == id, Asset.is_active == True).first()
    if not asset:
        raise AppException(status_code=404, message="Asset not found")
        
    if current_user.role == Role.Employee.value:
        alloc = db.query(Allocation).filter(Allocation.asset_id == asset.id, Allocation.employee_id == current_user.id).first()
        if not alloc:
            raise AppException(status_code=404, message="Asset not found")
    elif current_user.role == Role.DepartmentHead.value:
        try:
            check_department_scope(current_user, asset.department_id)
        except AppException:
            raise AppException(status_code=404, message="Asset not found")

    maintenance = db.query(MaintenanceRequest).filter(MaintenanceRequest.asset_id == id).all()
    data = [{"id": str(m.id), "status": m.status} for m in maintenance]
    return StandardResponse(data=data)

@router.get("/{id}/attachments", response_model=StandardResponse, dependencies=[Depends(require_role(Role.Employee, Role.DepartmentHead, Role.AssetManager, Role.Admin))])
async def get_asset_attachments(
    id: str = Path(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Same scope check
    asset = db.query(Asset).filter(Asset.id == id, Asset.is_active == True).first()
    if not asset:
        raise AppException(status_code=404, message="Asset not found")
        
    if current_user.role == Role.Employee.value:
        alloc = db.query(Allocation).filter(Allocation.asset_id == asset.id, Allocation.employee_id == current_user.id).first()
        if not alloc:
            raise AppException(status_code=404, message="Asset not found")
    elif current_user.role == Role.DepartmentHead.value:
        try:
            check_department_scope(current_user, asset.department_id)
        except AppException:
            raise AppException(status_code=404, message="Asset not found")

    return StandardResponse(data=[])

@router.post("/{id}/attachments", response_model=StandardResponse, dependencies=[Depends(require_role(Role.AssetManager, Role.Admin))])
async def upload_asset_attachment(
    id: str = Path(...),
    file: UploadFile = File(...)
):
    return StandardResponse(message="Attachment uploaded successfully", data={"filename": file.filename})

@router.get("/{id}/qr", response_model=StandardResponse, dependencies=[Depends(require_role(Role.AssetManager, Role.Admin))])
async def get_asset_qr(id: str = Path(...)):
    return StandardResponse(data={"qr_payload": f"assetflow://asset/{id}"})
