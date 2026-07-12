from shared.models import Asset
from core.exceptions import AppException
from core.events import dispatch
from sqlalchemy.orm import Session
from datetime import datetime
from uuid import UUID

class AssetStateService:
    VALID_TRANSITIONS = {
        "AVAILABLE":         {"ALLOCATED", "UNDER_MAINTENANCE", "RETIRED"},
        "ALLOCATED":         {"AVAILABLE", "UNDER_MAINTENANCE", "RETIRED"},
        "UNDER_MAINTENANCE": {"AVAILABLE", "RETIRED"},
        "RETIRED":           set(),                              # terminal — no transitions out
    }

    @classmethod
    def transition(cls, asset: Asset, new_status: str, db: Session, user_id: UUID):
        current_status = asset.status
        
        # If the status is not changing, do nothing
        if current_status == new_status:
            return asset
            
        allowed = cls.VALID_TRANSITIONS.get(current_status, set())
        if new_status not in allowed:
            raise AppException(
                status_code=409, 
                message=f"Cannot transition asset from {current_status} to {new_status}"
            )
            
        asset.status = new_status
        
        # Map generic transition to domain events
        event_name = "AssetStatusChanged"
        if new_status == "ALLOCATED":
            event_name = "AssetAllocated"
        elif new_status == "AVAILABLE" and current_status == "ALLOCATED":
            event_name = "AssetReturned"
        elif new_status == "RETIRED":
            event_name = "AssetRetired"
            
        dispatch(
            event_name, 
            {"asset_id": str(asset.id), "from": current_status, "to": new_status}, 
            db, 
            user_id
        )
        
        return asset
