from typing import Dict, Any

from pydantic import BaseModel


class ScreenValues(BaseModel):
    name: str
    attributes: Dict[str, Any]
