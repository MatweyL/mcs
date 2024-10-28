from dataclasses import dataclass, field
from typing import List, Optional

from service.domain.channel import Channel
from service.domain.direction import Direction
from service.domain.pprch import PPRCH


@dataclass
class Phone:
    active_direction: str = None
    directions: List[Direction] = field(default_factory=list)
    channels: List[Channel] = field(default_factory=list)
    pprchs: List[PPRCH] = field(default_factory=list)

    def find_channel(self, channel_uid: str) -> Optional[Channel]:
        for channel in self.channels:
            if channel.uid == channel_uid:
                return channel

    def find_direction(self, direction_uid: str) -> Optional[Direction]:
        for direction in self.directions:
            if direction.uid == direction_uid:
                return direction

    def find_pprch(self, pprch_uid: str) -> Optional[PPRCH]:
        for pprch in self.pprchs:
            if pprch.uid == pprch_uid:
                return pprch

    def find_active_direction(self, ) -> Optional[Direction]:
        for direction in self.directions:
            if direction.uid == self.active_direction:
                return direction

