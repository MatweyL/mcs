from dataclasses import dataclass, field
from typing import List, Optional

from service.domain.channel import Channel
from service.domain.direction import Direction


@dataclass
class Phone:
    directions: List[Direction] = field(default_factory=list)
    channels: List[Channel] = field(default_factory=list)

    def find_channel(self, channel_uid: str) -> Optional[Channel]:
        for channel in self.channels:
            if channel.uid == channel_uid:
                return channel

    def find_direction(self, direction_uid: str) -> Optional[Direction]:
        for direction in self.directions:
            if direction.uid == direction_uid:
                return direction
