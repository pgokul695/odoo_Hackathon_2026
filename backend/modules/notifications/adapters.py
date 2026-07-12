import httpx
from pydantic import BaseModel
from typing import Optional
from core.config import settings

class NotificationResult(BaseModel):
    success: bool
    provider: Optional[str] = None
    latency_ms: Optional[int] = None
    raw_error: Optional[str] = None

class EmailAdapter:
    async def send(self, to: list[str], subject: str, html: str) -> NotificationResult:
        raise NotImplementedError

class ProtoPostAdapter(EmailAdapter):
    async def send(self, to: list[str], subject: str, html: str) -> NotificationResult:
        payload = {
            "from": settings.MAIL_FROM,
            "to": to,
            "subject": subject,
            "body_html": html
        }
        
        # Localhost doesn't need auth, so omit Authorization header completely
        headers = {
            "Content-Type": "application/json"
        }
        
        try:
            # 5s timeout, no cold start issue on localhost
            async with httpx.AsyncClient(timeout=5.0) as client:
                response = await client.post(settings.PROTOPOST_URL, json=payload, headers=headers)
                response.raise_for_status()
                data = response.json()
                
                return NotificationResult(
                    success=data.get("status") == "success",
                    provider=data.get("provider"),
                    latency_ms=data.get("processing_time_ms")
                )
        except Exception as e:
            return NotificationResult(
                success=False,
                raw_error=str(e)
            )

class ActivityLogAdapter:
    def log(self, event_type: str, details: str):
        # Placeholder for full governance module activity logging
        print(f"[ActivityLog] {event_type}: {details}")
