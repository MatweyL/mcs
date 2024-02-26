from dataclasses import dataclass, field
from typing import List

from service.domain.channel import Channel
from service.domain.direction import Direction


@dataclass
class Phone:
    directions: List[Direction] = field(default_factory=list)
    channels: List[Channel] = field(default_factory=list)
