from typing import Dict, Any

from service.core.screen.processor.get.get_screen_processor import GetScreenProcessor
from service.domain.session import Session


class ChannelListGetScreenProcessor(GetScreenProcessor):
    def process(self, session: Session, screen_template: Dict[str, Any], uid: str):
        attributes = screen_template['attributes']
        channels = session.phone.channels
        for channel in channels:
            attributes[channel.uid] = {
                'type': 'CARD_ITEM',
                'label': channel.name,
                'uid': channel.uid
            }

    def get_screen_name(self) -> str:
        return "CHANNEL_LIST"
