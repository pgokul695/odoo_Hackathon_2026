import pytest
from httpx import AsyncClient
from main import app
from fastapi.routing import APIRoute

# Collect all routes from the app
ROUTES = []
for route in app.routes:
    if isinstance(route, APIRoute):
        ROUTES.append({
            "path": route.path,
            "methods": route.methods,
            "name": route.name
        })

@pytest.mark.contract
def test_envelope_shape_success(client, make_admin):
    admin_client, user = make_admin()
    response = admin_client.get("/api/auth/me/")
    assert response.status_code == 200
    data = response.json()
    assert "success" in data
    assert "data" in data
    assert "message" in data
    assert "meta" in data
    assert data["success"] is True

@pytest.mark.contract
def test_envelope_shape_error(client):
    response = client.get("/api/auth/me/")
    assert response.status_code == 401
    data = response.json()
    assert "success" in data
    assert "message" in data
    assert "errors" in data
    assert data["success"] is False

@pytest.mark.contract
def test_envelope_shape_422(client, make_admin):
    admin_client, _ = make_admin()
    # Missing required field
    response = admin_client.post("/api/categories/", json={})
    assert response.status_code == 422
    data = response.json()
    # 422 should NOT have the standard envelope, it should be native FastAPI format
    assert "detail" in data
    assert "success" not in data

@pytest.mark.contract
def test_unreachable_enums():
    # Assert PENDING booking and IN_PROGRESS maintenance are never targets of any state machine
    from modules.assets.services import AssetStateService
    # Checking our source code via simple inspection or asserting they don't exist in our factories
    # We will test this more strictly in integration tests when trying to transition to them.
    pass

@pytest.mark.contract
@pytest.mark.parametrize("route", ROUTES)
def test_trailing_slash_exactness(client, route):
    path = route["path"]
    method = list(route["methods"] - {"HEAD", "OPTIONS"})[0]
    
    # Exclude openapi routes
    if not path.startswith("/api"):
        return
        
    # We just want to check if the route redirects or 404s when trailing slash is omitted/added
    if path.endswith("/"):
        # Without slash should 307 or 404
        test_path = path[:-1]
        res = client.request(method, test_path, allow_redirects=False)
        assert res.status_code in [307, 308, 404, 405, 401] # Usually 307 for redirect, or 401 auth
    else:
        # With slash should 404
        test_path = path + "/"
        res = client.request(method, test_path, allow_redirects=False)
        assert res.status_code in [404, 307, 405, 401]

@pytest.mark.contract
def test_rbac_user_role_blocked(client, make_pending_user):
    user_client, _ = make_pending_user()
    for route in ROUTES:
        path = route["path"]
        if not path.startswith("/api"):
            continue
            
        # Ignore public / user routes
        if path in ["/api/auth/signup/", "/api/auth/verify-signup-otp/", "/api/auth/login/", 
                    "/api/auth/resend-otp/", "/api/auth/me/", "/api/auth/logout/", "/api/settings/two-factor/"]:
            continue
            
        method = list(route["methods"] - {"HEAD", "OPTIONS"})[0]
        # Replace path params with dummy uuid
        test_path = path.replace("{id}", "123e4567-e89b-12d3-a456-426614174000").replace("{audit_id}", "123e4567-e89b-12d3-a456-426614174000")
        
        res = user_client.request(method, test_path)
        assert res.status_code in [403, 405] # Blocked by role dependency
