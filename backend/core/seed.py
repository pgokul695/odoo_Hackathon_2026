from sqlalchemy.orm import Session
from shared.models import User, Department, Asset, Allocation, Booking, MaintenanceRequest, Audit, Report, Notification, Category
from shared.enums import Role
from core.security import get_password_hash
from datetime import datetime, timedelta

def seed_test_data(db: Session):
    # Check if we already seeded by checking departments
    if db.query(Department).first():
        return

    # 1. Departments
    dept_it = Department(name="IT Services")
    dept_hr = Department(name="Human Resources")
    db.add(dept_it)
    db.add(dept_hr)
    db.commit()

    # 2. Users
    pwd = get_password_hash("password")
    
    admin = User(name="Admin User", email="admin@test.com", hashed_password=pwd, role=Role.Admin.value, email_verified_at=datetime.utcnow())
    asset_mgr = User(name="Asset Manager", email="mgr@test.com", hashed_password=pwd, role=Role.AssetManager.value, email_verified_at=datetime.utcnow())
    
    head_it = User(name="IT Head", email="head.it@test.com", hashed_password=pwd, role=Role.DepartmentHead.value, department_id=dept_it.id, email_verified_at=datetime.utcnow())
    emp_it = User(name="IT Emp", email="emp.it@test.com", hashed_password=pwd, role=Role.Employee.value, department_id=dept_it.id, email_verified_at=datetime.utcnow())
    
    emp_hr = User(name="HR Emp", email="emp.hr@test.com", hashed_password=pwd, role=Role.Employee.value, department_id=dept_hr.id, email_verified_at=datetime.utcnow())
    
    unassigned = User(name="New Guy", email="new@test.com", hashed_password=pwd, role=Role.User.value, email_verified_at=datetime.utcnow())

    for u in [admin, asset_mgr, head_it, emp_it, emp_hr, unassigned]:
        db.add(u)
    db.commit()

    # 3. Category & Assets
    cat = Category(name="Electronics")
    db.add(cat)
    db.commit()
    
    asset1 = Asset(name="MacBook Pro - IT", department_id=dept_it.id)
    asset2 = Asset(name="Dell XPS - IT", department_id=dept_it.id)
    asset3 = Asset(name="ThinkPad - HR", department_id=dept_hr.id)
    db.add_all([asset1, asset2, asset3])
    db.commit()

    # 4. Allocations
    # IT Emp gets asset1
    # HR Emp gets asset3
    db.add(Allocation(asset_id=asset1.id, employee_id=emp_it.id))
    db.add(Allocation(asset_id=asset3.id, employee_id=emp_hr.id))
    db.commit()

    # 5. Bookings
    db.add(Booking(asset_id=asset1.id, employee_id=head_it.id, start_time=datetime.utcnow() + timedelta(days=1), end_time=datetime.utcnow() + timedelta(days=1, hours=2), status="CONFIRMED"))
    db.add(Booking(asset_id=asset3.id, employee_id=emp_hr.id, start_time=datetime.utcnow() + timedelta(days=2), end_time=datetime.utcnow() + timedelta(days=2, hours=3), status="CONFIRMED"))
    db.commit()

    # 6. Maintenance
    db.add(MaintenanceRequest(asset_id=asset1.id, employee_id=emp_it.id, department_id=dept_it.id))
    db.add(MaintenanceRequest(asset_id=asset3.id, employee_id=emp_hr.id, department_id=dept_hr.id))
    db.commit()

    # 7. Notifications
    db.add(Notification(user_id=emp_it.id, message="Your IT asset is approved"))
    db.add(Notification(user_id=emp_hr.id, message="Welcome to HR"))
    db.commit()
    
    print("Seed data initialized.")
