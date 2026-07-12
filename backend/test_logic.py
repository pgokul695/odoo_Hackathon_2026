from core.database import SessionLocal
from shared.models import Asset, MaintenanceRequest, User, Department
from core.exceptions import AppException
from modules.assets.services import AssetStateService
import asyncio

async def run_test():
    db = SessionLocal()
    admin_user = db.query(User).filter(User.name == "Admin User").first()
    emp_it = db.query(User).filter(User.name == "IT Emp").first()
    
    # 1. Get an asset
    asset = db.query(Asset).filter(Asset.name == "Dell XPS - IT").first()
    
    # ensure clean state
    if asset.status != "AVAILABLE":
        AssetStateService.transition(asset, "AVAILABLE", db, admin_user.id)
        db.commit()
    db.query(MaintenanceRequest).filter(MaintenanceRequest.asset_id == asset.id).delete()
    db.commit()

    from modules.maintenance.router import create_maintenance, approve_maintenance, reject_maintenance, complete_maintenance, get_maintenance_logs
    from modules.maintenance.router import MaintenanceCreate, MaintenanceComplete
    
    print("\n--- Test 1: Request on RETIRED Asset ---")
    AssetStateService.transition(asset, "RETIRED", db, admin_user.id)
    db.commit()
    try:
        req = MaintenanceCreate(asset_id=asset.id)
        await create_maintenance(req, db, emp_it)
        print("FAIL: Allowed maintenance on RETIRED asset")
    except AppException as e:
        if e.status_code == 400: print("PASS: Prevented maintenance on RETIRED asset")
        else: print("FAIL:", e.status_code)
        
    # restore asset
    AssetStateService.transition(asset, "AVAILABLE", db, admin_user.id)
    db.commit()

    print("\n--- Test 2: Valid Request & Duplicate Open Check ---")
    req1 = MaintenanceCreate(asset_id=asset.id)
    res1 = await create_maintenance(req1, db, emp_it)
    m_req_id = res1.data["id"]
    print("PASS: Created valid maintenance request")
    
    try:
        req2 = MaintenanceCreate(asset_id=asset.id)
        await create_maintenance(req2, db, emp_it)
        print("FAIL: Allowed duplicate open request")
    except AppException as e:
        if e.status_code == 409: print("PASS: Prevented duplicate open request")
        else: print("FAIL:", e.status_code)

    print("\n--- Test 3: Out-of-band Complete/Reject ---")
    try:
        await complete_maintenance(MaintenanceComplete(resolution_notes="Fixed"), m_req_id, db, admin_user)
        print("FAIL: Completed REQUESTED request")
    except AppException as e:
        if e.status_code == 409: print("PASS: Prevented completing REQUESTED request")
        else: print("FAIL:", e.status_code)
        
    print("\n--- Test 4: Approve & Side Effects ---")
    await approve_maintenance(m_req_id, db, admin_user)
    print("PASS: Approved request successfully")
    db.refresh(asset)
    if asset.status == "UNDER_MAINTENANCE":
        print("PASS: Asset status flipped to UNDER_MAINTENANCE")
    else:
        print("FAIL: Asset status is", asset.status)
        
    try:
        await reject_maintenance(m_req_id, db, admin_user)
        print("FAIL: Rejected APPROVED request")
    except AppException as e:
        if e.status_code == 409: print("PASS: Prevented rejecting APPROVED request")
        else: print("FAIL:", e.status_code)
        
    print("\n--- Test 5: Complete & Validation ---")
    try:
        await complete_maintenance(MaintenanceComplete(resolution_notes="   "), m_req_id, db, admin_user)
        print("FAIL: Completed with empty notes")
    except AppException as e:
        if e.status_code == 400: print("PASS: Prevented completing with empty notes")
        else: print("FAIL:", e.status_code)
        
    await complete_maintenance(MaintenanceComplete(resolution_notes="Replaced faulty ram"), m_req_id, db, admin_user)
    print("PASS: Completed request successfully")
    db.refresh(asset)
    if asset.status == "AVAILABLE":
        print("PASS: Asset status flipped to AVAILABLE")
    else:
        print("FAIL: Asset status is", asset.status)

    print("\n--- Test 6: Logs ---")
    logs = await get_maintenance_logs(m_req_id, 0, 100, db, emp_it)
    actions = [l["action"] for l in logs.data]
    if actions == ["REQUESTED", "APPROVED", "COMPLETED"]:
        print("PASS: Logs generated exactly as expected:", actions)
    else:
        print("FAIL: Logs generated incorrectly:", actions)

if __name__ == "__main__":
    asyncio.run(run_test())
