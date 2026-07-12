from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.db import get_db
from core.response import StandardResponse
from core.config import settings
from core import models

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_categories(db: Session = Depends(get_db)):
    if settings.USE_MOCK_DATA:
        return StandardResponse(data=[{"id": "mock-cat-1", "name": "Laptops", "description": "Company laptops"}])
    
    categories = db.query(models.Category).all()
    # Serialize categories
    data = []
    for c in categories:
        data.append({
            "id": c.id,
            "name": c.name,
            "description": c.description,
            "totalAssets": c.totalAssets,
            "allocatedAssets": c.allocatedAssets
        })
    return StandardResponse(data=data)
