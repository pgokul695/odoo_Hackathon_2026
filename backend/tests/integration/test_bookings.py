import pytest
from datetime import datetime, timedelta, timezone
from tests.factories.assets import make_asset, create_department, create_category
from tests.factories.bookings import make_booking

@pytest.mark.integration
def test_booking_rules(client, make_admin, make_employee, now):
    admin_client, _ = make_admin()
    dept = create_department(admin_client, "Booking Dept")
    cat = create_category(admin_client, "Projectors")
    emp_client, emp = make_employee(type("obj", (object,), {"id": dept["id"]}))
    
    # AVAILABLE asset
    asset = make_asset(admin_client, dept["id"], cat["id"], status="AVAILABLE")
    # ALLOCATED asset
    asset_alloc = make_asset(admin_client, dept["id"], cat["id"], status="ALLOCATED")
    
    start1 = (now + timedelta(days=1)).replace(tzinfo=None)
    end1 = (start1 + timedelta(hours=2)).replace(tzinfo=None)
    
    # 1. AVAILABLE-only gate
    res = emp_client.post("/api/bookings/", json={"asset_id": asset_alloc["id"], "start_time": start1.isoformat(), "end_time": end1.isoformat()})
    assert res.status_code == 400
    
    # 2. Time validations
    # end <= start -> 400
    res = emp_client.post("/api/bookings/", json={"asset_id": asset["id"], "start_time": end1.isoformat(), "end_time": start1.isoformat()})
    assert res.status_code == 400
    # past -> 400
    past = (now - timedelta(days=1)).replace(tzinfo=None)
    res = emp_client.post("/api/bookings/", json={"asset_id": asset["id"], "start_time": past.isoformat(), "end_time": end1.isoformat()})
    assert res.status_code == 400
    
    # 3. Successful booking
    b1 = make_booking(emp_client, asset["id"], start1, end1, status="CONFIRMED")
    
    # 4. Overlap exact boundary -> SUCCESS
    start2 = end1
    end2 = (start2 + timedelta(hours=1)).replace(tzinfo=None)
    res = emp_client.post("/api/bookings/", json={"asset_id": asset["id"], "start_time": start2.isoformat(), "end_time": end2.isoformat()})
    assert res.status_code in [200, 201]
    
    # 5. Overlap partial -> 409
    start3 = (start1 + timedelta(hours=1)).replace(tzinfo=None)
    end3 = (start3 + timedelta(hours=2)).replace(tzinfo=None)
    res = emp_client.post("/api/bookings/", json={"asset_id": asset["id"], "start_time": start3.isoformat(), "end_time": end3.isoformat()})
    assert res.status_code == 409
    
    # 6. Booking never writes Asset.status
    res = admin_client.get(f"/api/assets/{asset['id']}")
    assert res.json()["data"]["status"] == "AVAILABLE"
    
    # 7. Cancel scope
    emp2_client, _ = make_employee(type("obj", (object,), {"id": dept["id"]}))
    res = emp2_client.put(f"/api/bookings/{b1['id']}/cancel/")
    assert res.status_code == 403
    
    res = emp_client.put(f"/api/bookings/{b1['id']}/cancel/")
    assert res.status_code == 200
    
    # 8. Cancelling already cancelled -> 409
    res = emp_client.put(f"/api/bookings/{b1['id']}/cancel/")
    assert res.status_code == 409
