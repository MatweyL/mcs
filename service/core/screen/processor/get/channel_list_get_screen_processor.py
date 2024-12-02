from typing import Dict, Any, List

from service.core.screen.constants.screen_constants import CHANNEL_LIST
from service.core.screen.processor.get.get_screen_processor import GetScreenProcessor
from service.domain.channel import Channel
from service.domain.direction import Direction
from service.domain.session import Session


class ChannelListGetScreenProcessor(GetScreenProcessor):
    def process(self, session: Session, screen_template: Dict[str, Any], uid: str):
        attributes = screen_template['attributes']
        channels = session.phone.channels
        for channel in channels:
            attributes[channel.uid] = {
                'type': 'CARD_ITEM',
                'label': channel.name,
                'uid': channel.uid,
                'used': self.is_used(channel, session.phone.directions)
            }

    def is_used(self, channel: Channel, directions: List[Direction]):
        for direction in directions:
            if direction.channel == channel.uid:
                return True
        return False

    def get_screen_name(self) -> str:
        return CHANNEL_LIST
