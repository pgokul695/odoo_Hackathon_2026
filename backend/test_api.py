import urllib.request
import json
import time

def request(method, path, data=None):
    url = f"http://127.0.0.1:8000/api{path}"
    headers = {"Content-Type": "application/json"}
    req_data = json.dumps(data).encode('utf-8') if data else None
    
    req = urllib.request.Request(url, data=req_data, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req) as res:
            return json.loads(res.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8')
        print(f"Error for {method} {path}: {e.code} - {body}")
        raise e

def test_api():
    print("Starting API integration tests via urllib...")

    # Test GET assets
    assets = request("GET", "/assets/")
    assert assets["success"] is True
    print(f"[OK] GET /api/assets/ returned {len(assets['data'])} assets")

    # Test GET departments
    depts = request("GET", "/departments/")
    assert depts["success"] is True
    print(f"[OK] GET /api/departments/ returned {len(depts['data'])} departments")

    # Test POST asset
    payload = {
        "name": "Test Integration Laptop",
        "categoryId": "c-1",
        "departmentId": "d-1",
        "serialNumber": "SN-TEST-12345",
        "status": "Available",
        "purchaseDate": "2026-07-12",
        "purchaseValue": 999.99,
        "notes": "Testing integration"
    }
    res = request("POST", "/assets/", payload)
    assert res["success"] is True
    print(f"[OK] POST /api/assets/ created asset successfully: {res['data']}")

    # Test GET the newly created asset
    asset_id = res["data"]["id"]
    asset = request("GET", f"/assets/{asset_id}")
    assert asset["data"]["name"] == "Test Integration Laptop"
    print(f"[OK] GET /api/assets/{asset_id} verified name correctly")

    # Test PUT update asset
    request("PUT", f"/assets/{asset_id}", {"name": "Test Integration Laptop Updated"})
    asset_updated = request("GET", f"/assets/{asset_id}")
    assert asset_updated["data"]["name"] == "Test Integration Laptop Updated"
    print(f"[OK] PUT /api/assets/{asset_id} updated name successfully")

    # Test POST transfer request
    payload_transfer = {
        "asset_id": asset_id,
        "to_department_id": "d-2"
    }
    transfer_res = request("POST", "/transfers/", payload_transfer)
    assert transfer_res["success"] is True
    transfer_id = transfer_res["data"]["id"]
    print(f"[OK] POST /api/transfers/ created transfer request: {transfer_id}")

    # Test PUT approve transfer
    request("PUT", f"/transfers/{transfer_id}/approve/")
    print("[OK] PUT /api/transfers/{id}/approve/ completed successfully")

    # Test GET notification list
    notifs = request("GET", "/notifications/")
    print(f"[OK] GET /api/notifications/ returned {len(notifs['data'])} notifications")

    # Test PUT notification read status
    request("PUT", "/notifications/n-1/read/")
    print("[OK] PUT /api/notifications/n-1/read/ completed successfully")

    # Test GET dashboard metrics
    metrics = request("GET", "/dashboard/")["data"]
    assert "total_assets" in metrics
    print(f"[OK] GET /api/dashboard/ returned metrics: {metrics}")

    print("All backend API tests completed successfully!")

if __name__ == "__main__":
    test_api()
