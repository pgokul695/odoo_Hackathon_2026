from core.database import SessionLocal, engine
from core.database import Base
from shared.models import Asset, User, Report
from core.exceptions import AppException
import asyncio

async def run_test():
    # Force recreate tables since Report model changed
    db = SessionLocal()
    try:
        from sqlalchemy import text
        db.execute(text("DROP TABLE IF EXISTS reports CASCADE"))
        db.commit()
    except Exception as e:
        db.rollback()
        print("Drop error", e)
        
    Base.metadata.create_all(bind=engine)
    
    # Alternatively just start a session
    db = SessionLocal()
    admin_user = db.query(User).filter(User.name == "Admin User").first()
    
    # 1. Dashboard
    from modules.dashboard.router import get_dashboard
    dashboard_res = await get_dashboard(db)
    dash_data = dashboard_res.data
    
    print("\n--- Test 1: Dashboard Counts ---")
    if "assets_by_status" in dash_data and "total" in dash_data["assets_by_status"]:
        total_by_status = dash_data["assets_by_status"]["total"]
        total_by_dept = sum(dash_data["assets_by_department"].values())
        if total_by_status == total_by_dept:
            print(f"PASS: Dashboard totals align ({total_by_status})")
        else:
            print(f"FAIL: Dashboard mismatch status={total_by_status} vs dept={total_by_dept}")
    else:
        print("FAIL: Bad dashboard shape")
        
    # 2. Reports
    from modules.reports.router import generate_report, ReportGenerate, list_reports
    
    print("\n--- Test 2: Invalid Report Type ---")
    req_bad_type = ReportGenerate(report_type="MADE_UP", filters={})
    try:
        await generate_report(req_bad_type, db, admin_user)
        print("FAIL: Expected 400 on bad report type")
    except AppException as e:
        if e.status_code == 400:
            print("PASS: Rejected invalid report_type")
        else:
            print(f"FAIL: Wrong error code {e.status_code}")
            
    print("\n--- Test 3: Invalid Filter Key ---")
    req_bad_filter = ReportGenerate(report_type="ASSET_INVENTORY", filters={"audit_id": "123"})
    try:
        await generate_report(req_bad_filter, db, admin_user)
        print("FAIL: Expected 400 on invalid filter key")
    except AppException as e:
        if e.status_code == 400:
            print("PASS: Rejected invalid filter key")
        else:
            print(f"FAIL: Wrong error code {e.status_code}")
            
    print("\n--- Test 4: Generate Valid Report ---")
    req_valid = ReportGenerate(report_type="ASSET_INVENTORY", filters={"status": "AVAILABLE"})
    res_valid = await generate_report(req_valid, db, admin_user)
    if isinstance(res_valid.data, list):
        print(f"PASS: Generated ASSET_INVENTORY with {len(res_valid.data)} results")
    else:
        print("FAIL: ASSET_INVENTORY data is not a list")
        
    print("\n--- Test 5: List Reports Metadata ---")
    res_list = await list_reports(0, 20, db)
    reports = res_list.data
    if len(reports) > 0 and "filters" in reports[0] and "data" not in reports[0]:
        print("PASS: list_reports returns metadata only")
    else:
        print("FAIL: list_reports returned bad shape")

if __name__ == "__main__":
    asyncio.run(run_test())
