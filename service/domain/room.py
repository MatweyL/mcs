from dataclasses import dataclass, field
from typing import List


@dataclass
class Room:
    author_sid: str = None
    author_name: str = None
    clients: List[str] = field(default_factory=list)
