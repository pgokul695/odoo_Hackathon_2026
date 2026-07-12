import sys
import random
import uuid
import os
from datetime import datetime, timedelta

# Ensure we can import from backend root
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from sqlalchemy import text
from core.database import SessionLocal, engine, Base
from shared.models import (
    User, Department, Asset, Allocation, Transfer, Booking, 
    MaintenanceRequest, MaintenanceLog, Audit, AuditResult, 
    Notification, NotificationPreference, OrganizationSettings, Category,
    ActivityLog, OtpCode
)
from shared.enums import Role
from core.security import get_password_hash

def reset_db(db: Session):
    tables = [
        "audit_results", "audits", "maintenance_logs", "maintenance_requests",
        "bookings", "transfers", "allocations", "assets", "categories",
        "activity_logs", "notifications", "notification_preferences",
        "otp_codes", "users", "departments", "organization_settings", "reports"
    ]
    try:
        if engine.dialect.name == "postgresql":
            for table in tables:
                db.execute(text(f"DROP TABLE IF EXISTS {table} CASCADE"))
            db.commit()
        else:
            Base.metadata.drop_all(bind=engine)
            
        Base.metadata.create_all(bind=engine)
    except Exception as e:
        db.rollback()
        print(f"Error resetting database: {e}")
        sys.exit(1)

def log_and_notify(db: Session, action: str, module: str, details: str, actor_id: uuid.UUID, recipient_ids: list, message: str, timestamp: datetime):
    # Log Activity
    log = ActivityLog(module=module, action=action, details=details, user_id=actor_id, created_at=timestamp)
    db.add(log)
    
    # Notify
    for rid in set(recipient_ids):
        if str(rid) == str(actor_id):
            continue # No self-notification
        db.add(Notification(user_id=rid, message=message, created_at=timestamp))

def main():
    """
    Seed Demo Script. 
    Same dataset every time: Shape, workflow distribution and counts are identical per run. 
    Absolute dates are relative to run time.
    """
    random.seed(42)
    now = datetime.utcnow()
    
    is_reset = "--reset" in sys.argv
    db = SessionLocal()
    
    try:
        org = db.query(OrganizationSettings).first()
        if org and not is_reset:
            print("Database already contains data (TechNova Solutions Pvt Ltd). Pass --reset to overwrite.")
            sys.exit(1)
            
        if is_reset:
            reset_db(db)
            print("Database tables reset.")

        # 1. Organization & Departments
        db.add(OrganizationSettings(name="TechNova Solutions Pvt Ltd"))
        dept_names = ["Engineering", "IT Support", "Human Resources", "Finance", "Operations", "Administration", "Research & Development"]
        departments = {name: Department(name=name) for name in dept_names}
        for d in departments.values():
            db.add(d)
        db.commit()

        # 2. Users
        pwd = get_password_hash("password123")
        users = []
        
        # Helper to generate emails
        def make_email(name):
            return f"{name.lower().replace(' ', '.')}@technova.io"

        # Admin
        admin = User(name="Alex Mercer", email=make_email("Alex Mercer"), hashed_password=pwd, role=Role.Admin.value, created_at=now - timedelta(days=90), email_verified_at=now - timedelta(days=90))
        users.append(admin)

        # AssetManagers
        am_names = ["Sarah Connor", "John Smith", "Emily Chen"]
        asset_managers = [User(name=n, email=make_email(n), hashed_password=pwd, role=Role.AssetManager.value, created_at=now - timedelta(days=85), email_verified_at=now - timedelta(days=85)) for n in am_names]
        users.extend(asset_managers)

        # Department Heads
        dh_names = ["Michael Scott", "Roy Trenneman", "Toby Flenderson", "Oscar Martinez", "Darryl Philbin", "Pam Beesly", "Walter White"]
        dept_heads = {}
        for d_name, u_name in zip(dept_names, dh_names):
            dh = User(name=u_name, email=make_email(u_name), hashed_password=pwd, role=Role.DepartmentHead.value, department_id=departments[d_name].id, created_at=now - timedelta(days=80), email_verified_at=now - timedelta(days=80))
            dept_heads[d_name] = dh
            users.append(dh)

        # Employees
        emp_weights = {"Engineering": 8, "Operations": 5, "IT Support": 4, "Research & Development": 3, "Finance": 2, "Human Resources": 2, "Administration": 1}
        emp_firsts = ["James", "Mary", "Robert", "Patricia", "David", "Linda", "Richard", "Elizabeth", "Joseph", "Barbara", "Thomas", "Susan", "Charles", "Jessica", "Christopher", "Karen", "Daniel", "Lisa", "Matthew", "Nancy", "Anthony", "Betty", "Mark", "Margaret", "Donald"]
        emp_lasts = ["Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez"]
        
        employees = []
        emp_idx = 0
        for d_name, count in emp_weights.items():
            for _ in range(count):
                name = f"{emp_firsts[emp_idx]} {emp_lasts[emp_idx]}"
                emp = User(name=name, email=make_email(name), hashed_password=pwd, role=Role.Employee.value, department_id=departments[d_name].id, created_at=now - timedelta(days=random.randint(10, 75)), email_verified_at=now - timedelta(days=random.randint(10, 75)))
                employees.append(emp)
                users.append(emp)
                emp_idx += 1

        # Pending Users
        pending_names = ["Alice Newbie", "Bob Starter", "Charlie Fresh", "Diana Novice", "Eve Beginner"]
        for n in pending_names:
            created = now - timedelta(days=random.randint(1, 5))
            u = User(name=n, email=make_email(n), hashed_password=pwd, role=Role.User.value, created_at=created, email_verified_at=created)
            users.append(u)

        db.add_all(users)
        db.commit()

        # 3. Categories
        cat_names = ["Laptops", "Desktops", "Servers", "Networking", "Monitors", "Furniture", "Projectors", "Vehicles", "Conference Equipment", "Laboratory Equipment"]
        categories = {name: Category(name=name) for name in cat_names}
        db.add_all(categories.values())
        db.commit()

        # 4. Assets (65 total: 40 AVAIL, 18 ALLOCATED, 5 MAINT, 2 RETIRED)
        asset_models = {
            "Laptops": ["Dell Latitude 7440", "ThinkPad T14 Gen2", "MacBook Pro M3"],
            "Desktops": ["OptiPlex 7090", "HP EliteDesk 800"],
            "Servers": ["Dell PowerEdge R760", "HPE ProLiant DL380"],
            "Networking": ["Cisco Catalyst 9300", "Meraki MX68", "HP LaserJet MFP"],
            "Monitors": ["Dell UltraSharp 27", "LG 27UN850-W"],
            "Furniture": ["Standing Desk", "Ergonomic Chair", "Filing Cabinet"],
            "Projectors": ["Epson Pro EX9220"],
            "Vehicles": ["Toyota Innova"],
            "Conference Equipment": ["Meeting Room A", "Meeting Room B", "Polycom Studio"],
            "Laboratory Equipment": ["Creality 3D Printer", "Oscilloscope"]
        }

        # Weight depts for hardware
        hw_depts = ["Engineering"] * 15 + ["Operations"] * 10 + ["IT Support"] * 10 + ["Research & Development"] * 8 + ["Finance"] * 5 + ["Human Resources"] * 4 + ["Administration"] * 3
        
        shared_categories = ["Projectors", "Vehicles", "Conference Equipment"]
        retired_assets = []
        maintenance_assets = []
        allocated_assets = []
        available_assets = []
        
        all_assets = []

        # Create 2 retired (old equipment)
        for i in range(2):
            d = departments[hw_depts.pop()]
            a = Asset(name=f"Old Desktop {i+1}", department_id=d.id, status="RETIRED")
            retired_assets.append(a)
            all_assets.append(a)

        # Create 5 maintenance assets
        for i in range(5):
            d = departments[hw_depts.pop()]
            c_name = random.choice(["Laptops", "Networking", "Desktops"])
            a = Asset(name=f"{random.choice(asset_models[c_name])} (Maint)", department_id=d.id, status="UNDER_MAINTENANCE")
            maintenance_assets.append(a)
            all_assets.append(a)

        # Create 18 allocated assets
        for i in range(18):
            d = departments[hw_depts.pop()]
            c_name = random.choice(["Laptops", "Desktops", "Monitors"])
            a = Asset(name=f"{random.choice(asset_models[c_name])} #{i+100}", department_id=d.id, status="ALLOCATED")
            allocated_assets.append(a)
            all_assets.append(a)

        # Create 40 available assets (mix of shared and personal)
        for i in range(40):
            if i < 8: # Shared assets
                c_name = random.choice(shared_categories)
                d_id = departments["Administration"].id if c_name != "Vehicles" else departments["Operations"].id
            else:
                c_name = random.choice([k for k in asset_models.keys() if k not in shared_categories])
                d_id = departments[hw_depts.pop() if hw_depts else random.choice(dept_names)].id
            
            a = Asset(name=f"{random.choice(asset_models[c_name])} #{i+200}", department_id=d_id, status="AVAILABLE")
            available_assets.append(a)
            all_assets.append(a)

        db.add_all(all_assets)
        db.commit()


        # 5. Allocations (18 active, 15 returned)
        allocations = []
        for i, a in enumerate(allocated_assets):
            # pick random employee in same dept ideally
            emp = next((u for u in employees if u.department_id == a.department_id), random.choice(employees))
            ts = now - timedelta(days=random.choice([2, 5, 25, 65, 80]))
            alloc = Allocation(asset_id=a.id, employee_id=emp.id, status="ACTIVE", allocated_at=ts)
            db.add(alloc)
            db.commit() # commit to get ID
            allocations.append(alloc)
            
            # side effects
            log_and_notify(db, "created", "allocations", f"Asset {a.name} allocated", admin.id, [emp.id], "You have been allocated a new asset.", ts)
            
        # 15 historical
        avail_personal = available_assets[8:]
        for i in range(15):
            a = random.choice(avail_personal)
            emp = next((u for u in employees if u.department_id == a.department_id), random.choice(employees))
            alloc_ts = now - timedelta(days=random.randint(40, 90))
            ret_ts = alloc_ts + timedelta(days=random.randint(5, 30))
            alloc = Allocation(asset_id=a.id, employee_id=emp.id, status="RETURNED", allocated_at=alloc_ts, returned_at=ret_ts)
            db.add(alloc)
            db.commit()
            allocations.append(alloc)
            
            log_and_notify(db, "created", "allocations", f"Asset {a.name} allocated", admin.id, [emp.id], "You have been allocated a new asset.", alloc_ts)
        # Pad historical allocations to hit ~300 activity logs total
        # We need ~110 more allocate/return cycles (each adds 2 logs)
        for i in range(110):
            a = random.choice(avail_personal)
            emp = next((u for u in employees if u.department_id == a.department_id), random.choice(employees))
            alloc_ts = now - timedelta(days=random.randint(40, 90))
            ret_ts = alloc_ts + timedelta(days=random.randint(5, 30))
            alloc = Allocation(asset_id=a.id, employee_id=emp.id, status="RETURNED", allocated_at=alloc_ts, returned_at=ret_ts)
            db.add(alloc)
            db.commit()
            allocations.append(alloc)
            
            log_and_notify(db, "created", "allocations", f"Asset {a.name} allocated", admin.id, [emp.id], "You have been allocated a new asset.", alloc_ts)
            log_and_notify(db, "returned", "allocations", f"Asset {a.name} returned", admin.id, [emp.id], "Asset return confirmed.", ret_ts)

        # 6. Transfers (7-8 total)
        # 2 PENDING
        transfer_assets = available_assets[:2]
        for a in transfer_assets:
            req_emp = next(u for u in employees if u.department_id == a.department_id)
            to_dept = next(d for d in departments.values() if d.id != a.department_id)
            ts = now - timedelta(days=random.randint(1, 3))
            t = Transfer(asset_id=a.id, requested_by_id=req_emp.id, from_department_id=a.department_id, to_department_id=to_dept.id, status="PENDING", requested_at=ts)
            db.add(t)
            db.commit()
            # Notify receiving DH
            dh = dept_heads[to_dept.name]
            log_and_notify(db, "requested", "transfers", f"Transfer requested for {a.name}", req_emp.id, [dh.id], "A new transfer awaits your approval.", ts)

        # 3 APPROVED
        for i in range(3):
            a = allocated_assets[i] # they are allocated now, transfer happened in past
            to_dept_id = a.department_id
            from_dept = next(d for d in departments.values() if d.id != to_dept_id)
            req_emp = next(u for u in employees if u.department_id == to_dept_id)
            ts = now - timedelta(days=random.randint(10, 40))
            app_ts = ts + timedelta(days=random.randint(1, 3))
            
            t = Transfer(asset_id=a.id, requested_by_id=req_emp.id, from_department_id=from_dept.id, to_department_id=to_dept_id, status="APPROVED", requested_at=ts, resolved_at=app_ts)
            db.add(t)
            db.commit()
            
            # Notify requesting emp
            log_and_notify(db, "approved", "transfers", f"Transfer approved for {a.name}", admin.id, [req_emp.id], "Your transfer was approved.", app_ts)
            
        # 2 REJECTED
        for i in range(2):
            a = available_assets[i+2]
            req_emp = next(u for u in employees if u.department_id == a.department_id)
            to_dept = next(d for d in departments.values() if d.id != a.department_id)
            ts = now - timedelta(days=random.randint(10, 20))
            rej_ts = ts + timedelta(days=1)
            t = Transfer(asset_id=a.id, requested_by_id=req_emp.id, from_department_id=a.department_id, to_department_id=to_dept.id, status="REJECTED", requested_at=ts, resolved_at=rej_ts)
            db.add(t)
            db.commit()
            log_and_notify(db, "rejected", "transfers", f"Transfer rejected for {a.name}", admin.id, [req_emp.id], "Your transfer was rejected.", rej_ts)

        # 7. Bookings
        shared = available_assets[:8]
        # 9 today
        for i in range(9):
            a = random.choice(shared)
            emp = random.choice(employees)
            start = now.replace(hour=8+i, minute=0, second=0, microsecond=0)
            end = start + timedelta(hours=1)
            b = Booking(asset_id=a.id, employee_id=emp.id, start_time=start, end_time=end, status="CONFIRMED", created_at=now-timedelta(days=1))
            db.add(b)
            db.commit()
            log_and_notify(db, "created", "bookings", f"Booking confirmed for {a.name}", emp.id, [emp.id], "Booking confirmed", now-timedelta(days=1))
            
        # ~15 other days
        for i in range(15):
            a = random.choice(shared)
            emp = random.choice(employees)
            day_offset = random.randint(-5, 5)
            if day_offset == 0: day_offset = 1 # skip today to preserve the 9
            start = now.replace(hour=random.randint(9, 16), minute=0, second=0, microsecond=0) + timedelta(days=day_offset)
            end = start + timedelta(hours=2)
            # check overlap
            overlap = db.query(Booking).filter(Booking.asset_id == a.id, Booking.status == "CONFIRMED", Booking.start_time < end, Booking.end_time > start).first()
            if overlap:
                continue
            status = "CONFIRMED" if random.random() > 0.2 else "CANCELLED"
            b = Booking(asset_id=a.id, employee_id=emp.id, start_time=start, end_time=end, status=status, created_at=now-timedelta(days=10))
            db.add(b)
            db.commit()
            
            if status == "CANCELLED":
                log_and_notify(db, "cancelled", "bookings", f"Booking cancelled for {a.name}", admin.id, [emp.id], "Booking was cancelled.", now-timedelta(days=5))

        # 8. Maintenance
        # 2 REQUESTED, 2 APPROVED (on the 2 maintenance_assets), 2 COMPLETED, 1 REJECTED
        # The 2 APPROVED
        for i in range(2):
            a = maintenance_assets[i]
            emp = next((u for u in employees if u.department_id == a.department_id), random.choice(employees))
            ts = now - timedelta(days=2)
            m = MaintenanceRequest(asset_id=a.id, employee_id=emp.id, department_id=a.department_id, status="APPROVED", created_at=ts)
            db.add(m)
            db.commit()
            db.add(MaintenanceLog(request_id=m.id, action="APPROVED", created_at=ts+timedelta(hours=1)))
            db.commit()
            log_and_notify(db, "requested", "maintenance", f"Maintenance requested for {a.name}", emp.id, [admin.id], "New maintenance request.", ts)
            log_and_notify(db, "approved", "maintenance", f"Maintenance approved for {a.name}", admin.id, [emp.id], "Maintenance approved.", ts+timedelta(hours=1))

        # 2 REQUESTED
        for i in range(2):
            a = available_assets[i+10]
            emp = next((u for u in employees if u.department_id == a.department_id), random.choice(employees))
            ts = now - timedelta(days=1)
            m = MaintenanceRequest(asset_id=a.id, employee_id=emp.id, department_id=a.department_id, status="REQUESTED", created_at=ts)
            db.add(m)
            db.commit()
            log_and_notify(db, "requested", "maintenance", f"Maintenance requested for {a.name}", emp.id, [admin.id], "New maintenance request.", ts)
            
        # 2 COMPLETED
        for i in range(2):
            a = available_assets[i+12]
            emp = next((u for u in employees if u.department_id == a.department_id), random.choice(employees))
            ts = now - timedelta(days=30)
            m = MaintenanceRequest(asset_id=a.id, employee_id=emp.id, department_id=a.department_id, status="COMPLETED", resolution_notes="Fixed screen.", created_at=ts)
            db.add(m)
            db.commit()
            db.add(MaintenanceLog(request_id=m.id, action="COMPLETED", notes="Fixed screen.", created_at=ts+timedelta(days=2)))
            db.commit()
            log_and_notify(db, "completed", "maintenance", f"Maintenance completed for {a.name}", admin.id, [emp.id], "Maintenance completed.", ts+timedelta(days=2))

        # 1 REJECTED
        a = available_assets[14]
        emp = random.choice(employees)
        ts = now - timedelta(days=15)
        m = MaintenanceRequest(asset_id=a.id, employee_id=emp.id, department_id=a.department_id, status="REJECTED", created_at=ts)
        db.add(m)
        db.commit()
        log_and_notify(db, "rejected", "maintenance", f"Maintenance rejected for {a.name}", admin.id, [emp.id], "Maintenance rejected.", ts+timedelta(hours=2))

        # 9. Audits
        audit = Audit(name="Quarterly Audit", status="OPEN", created_at=now - timedelta(days=5))
        db.add(audit)
        db.commit()
        
        # 3 DAMAGED (on the remaining 3 maintenance assets)
        for i in range(2, 5):
            a = maintenance_assets[i]
            res = AuditResult(audit_id=audit.id, asset_id=a.id, result="DAMAGED", notes="Screen broken", recorded_at=now-timedelta(days=1))
            db.add(res)
            dh = dept_heads[departments[next(k for k,v in departments.items() if v.id == a.department_id)].name]
            log_and_notify(db, "result_submitted", "audits", f"Audit: {a.name} is DAMAGED", admin.id, [dh.id], f"Asset {a.name} reported damaged.", now-timedelta(days=1))

        # 2 MISSING (on the 2 retired assets)
        for a in retired_assets:
            res = AuditResult(audit_id=audit.id, asset_id=a.id, result="MISSING", notes="Not found in storage", recorded_at=now-timedelta(days=2))
            db.add(res)
            dh = dept_heads[departments[next(k for k,v in departments.items() if v.id == a.department_id)].name]
            log_and_notify(db, "result_submitted", "audits", f"Audit: {a.name} is MISSING", admin.id, [dh.id], f"Asset {a.name} reported missing.", now-timedelta(days=2))
            
        # 45 FOUND (on available/allocated)
        found_pool = available_assets[15:] + allocated_assets # 25 avail + 18 alloc = 43. 
        # Add a couple more from the shared/early available to hit 45 without duplicates.
        found_pool += available_assets[0:2]
        
        for a in found_pool[:45]:
            res = AuditResult(audit_id=audit.id, asset_id=a.id, result="FOUND", recorded_at=now-timedelta(days=3))
            db.add(res)
            
        db.commit()

        # Final checks
        def assert_equal(name, actual, expected):
            if actual != expected:
                print(f"FAILED CHECK: {name}. Expected {expected}, got {actual}")
                sys.exit(1)
                
        assert_equal("Available Assets", db.query(Asset).filter(Asset.status == "AVAILABLE").count(), 40)
        assert_equal("Allocated Assets", db.query(Asset).filter(Asset.status == "ALLOCATED").count(), 18)
        assert_equal("Maintenance Assets", db.query(Asset).filter(Asset.status == "UNDER_MAINTENANCE").count(), 5)
        assert_equal("Retired Assets", db.query(Asset).filter(Asset.status == "RETIRED").count(), 2)
        assert_equal("Active Allocations", db.query(Allocation).filter(Allocation.status == "ACTIVE").count(), 18)
        assert_equal("Total Users", db.query(User).count(), 41)
        
        print(f"Successfully seeded database with identical structure. ({db.query(ActivityLog).count()} activity logs)")
        sys.exit(0)
    except Exception as e:
        db.rollback()
        import traceback
        traceback.print_exc()
        print(f"Seed failed: {e}")
        sys.exit(1)
    finally:
        db.close()

if __name__ == "__main__":
    main()
