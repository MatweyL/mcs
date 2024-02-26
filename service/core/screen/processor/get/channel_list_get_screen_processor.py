from typing import Dict, Any

from service.common.logs import logger
from service.domain.session import Session
from service.core.screen.processor.get.get_screen_processor import GetScreenProcessor


class ChannelListGetScreenProcessor(GetScreenProcessor):
    def process(self, session: Session, screen_template: Dict[str, Any], uid: str):
        logger.info(screen_template)
        attributes = screen_template['attributes']
        channels = session.phone.channels
        for channel in channels:
            attributes[channel.uid] = {
                'type': 'CARD_ITEM',
                'label': channel.name,
                'uid': channel.uid
            }

        return screen_template

    def get_screen_name(self) -> str:
        return "CHANNEL_LIST"
