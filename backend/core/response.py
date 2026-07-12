from typing import Any, Generic, TypeVar, Optional
from pydantic import BaseModel

T = TypeVar('T')

class StandardResponse(BaseModel, Generic[T]):
    success: bool = True
    data: Optional[T] = []
    message: str = ""
    meta: dict = {}

class ErrorResponse(BaseModel):
    success: bool = False
    message: str
    errors: dict = {}
