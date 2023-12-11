from typing import Dict, Any

from pydantic import BaseModel


class AttributeUpdated(BaseModel):
    name: str
    value: Any


class ScreenUpdated(BaseModel):
    name: str
    attributes: Dict[str, Any]
