from typing import Dict, Any

from service.common.logs import logger
from service.screen.processor.get.get_screen_processor import GetScreenProcessor
from service.session.models import Session


class ChannelListGetScreenProcessor(GetScreenProcessor):
    def process(self, session: Session, screen_template: Dict[str, Any]):
        logger.info(screen_template)
        attributes = screen_template['attributes']
        for channel in session.channels:
            # FIXME: Должно быть взаимодействие через доменку
            attributes[channel['uid']] = {
                'type': 'CARD_ITEM',
                'label': 'Канал Х',
                'uid': channel['uid']
            }

        return screen_template

    def get_screen_name(self) -> str:
        return "CHANNEL_LIST"