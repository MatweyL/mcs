from dataclasses import dataclass, field
from typing import List

from service.domain_v2.channel import Channel
from service.domain_v2.direction import Direction


@dataclass
class Phone:
    directions: List[Direction] = field(default_factory=list)
    channels: List[Channel] = field(default_factory=list)
