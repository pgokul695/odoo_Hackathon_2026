import pytest
from httpx import AsyncClient
from main import app
from fastapi.testclient import TestClient

@pytest.mark.e2e
def test_full_workflow(db, client, make_admin, mock_protopost):
    # 1. Signup
    res = client.post("/api/auth/signup/", json={
        "name": "E2E User",
        "email": "e2e@example.com",
        "password": "password123"
    })
    assert res.status_code in [200, 201]
    # Extract the OTP from the mocked email notification
    assert len(mock_protopost.calls) > 0
    import json
    email_payload = json.loads(mock_protopost.calls[-1].request.content)
    # The body_html looks like: "Your code is 123456"
    code = email_payload["body_html"].split("is ")[1][:6]
    
    from shared.models import User
    user = db.query(User).filter(User.email == "e2e@example.com").first()
    user_id = str(user.id)
    
    # 2. Verify OTP
    res = client.post("/api/auth/verify-signup-otp/", json={
        "email": "e2e@example.com",
        "code": code
    })
    assert res.status_code == 200
    
    # 3. Login
    res = client.post("/api/auth/login/", json={
        "email": "e2e@example.com",
        "password": "password123"
    })
    assert res.status_code == 200
    token = res.json()["data"]["token"]
    
    # 4. Role Assignment (Admin assigns Employee to a Dept)
    admin_client, _ = make_admin()
    dept_res = admin_client.post("/api/departments/", json={"name": "E2E Dept"})
    dept_id = dept_res.json()["data"]["id"]
    
    res = admin_client.put(f"/api/employees/{user_id}/role/", json={
        "role": "Employee",
        "department_id": dept_id
    })
    assert res.status_code == 200
    
    # 5. E2E User can now do Employee things
    e2e_client = TestClient(app)
    e2e_client.headers.update({"Authorization": f"Bearer {token}"})
    
    res = e2e_client.get("/api/auth/me/")
    assert res.status_code == 200
    assert res.json()["data"]["role"] == "Employee"
