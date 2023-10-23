from pydantic import BaseModel


class Attribute(BaseModel):
    name: str
    type: str
