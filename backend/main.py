from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings

from modules.dashboard.router import router as dashboard_router
from modules.assets.router import router as assets_router
from modules.categories.router import router as categories_router
from modules.departments.router import router as departments_router
from modules.employees.router import router as employees_router
from modules.allocations.router import router as allocations_router
from modules.bookings.router import router as bookings_router
from modules.maintenance.router import router as maintenance_router
from modules.audits.router import router as audits_router
from modules.reports.router import router as reports_router
from modules.notifications.router import router as notifications_router
from modules.auth.router import router as auth_router
from modules.transfers.router import router as transfers_router
from modules.activity_logs.router import router as activity_logs_router
from modules.settings.router import router as settings_router

from core.database import engine, Base, SessionLocal
from core.exceptions import AppException
from core.response import ErrorResponse
from fastapi.responses import JSONResponse
from fastapi import Request
from core.seed import seed_test_data



# Create database tables for hackathon scope
try:
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        seed_test_data(db)
except Exception as e:
    print(f"Warning: Could not initialize database tables: {e}")



app = FastAPI(title=settings.PROJECT_NAME)

@app.exception_handler(AppException)
async def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(
        status_code=exc.status_code,
        content=ErrorResponse(message=exc.message, errors=exc.errors).model_dump()
    )

from fastapi.exceptions import HTTPException
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content=ErrorResponse(message=str(exc.detail)).model_dump()
    )

# CORS configuration

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:4016",
        "https://localhost:4017",
        "localhost:4017",
        "https://kairos.gokulp.online",
        "https://kairosb.gokulp.online",
        "http://kairos.gokulp.online",
        "http://kairosb.gokulp.online",
    ], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(dashboard_router, prefix=f"{settings.API_V1_STR}/dashboard", tags=["dashboard"])
app.include_router(assets_router, prefix=f"{settings.API_V1_STR}/assets", tags=["assets"])
app.include_router(categories_router, prefix=f"{settings.API_V1_STR}/categories", tags=["categories"])
app.include_router(departments_router, prefix=f"{settings.API_V1_STR}/departments", tags=["departments"])
app.include_router(employees_router, prefix=f"{settings.API_V1_STR}/employees", tags=["employees"])
app.include_router(allocations_router, prefix=f"{settings.API_V1_STR}/allocations", tags=["allocations"])
app.include_router(bookings_router, prefix=f"{settings.API_V1_STR}/bookings", tags=["bookings"])
app.include_router(maintenance_router, prefix=f"{settings.API_V1_STR}/maintenance", tags=["maintenance"])
app.include_router(audits_router, prefix=f"{settings.API_V1_STR}/audits", tags=["audits"])
app.include_router(reports_router, prefix="/api/reports", tags=["Reports"])
app.include_router(notifications_router, prefix="/api/notifications", tags=["Notifications"])
app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(transfers_router, prefix="/api/transfers", tags=["Transfers"])
app.include_router(activity_logs_router, prefix="/api/activity-logs", tags=["Activity Logs"])
app.include_router(settings_router, prefix="/api/settings", tags=["Settings"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=4016, reload=True)
