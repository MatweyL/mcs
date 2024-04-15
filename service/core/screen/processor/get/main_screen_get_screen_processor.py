from typing import Dict, Any

from service.common.logs import logger
from service.core.screen.processor.get.get_screen_processor import GetScreenProcessor
from service.domain.session import Session


class MainScreenGetScreenProcessor(GetScreenProcessor):

    def process(self, session: Session, screen_template: Dict[str, Any], uid: str):
        attributes = screen_template['attributes']
        phone = session.phone

        logger.info(phone)
        if not phone.active_direction:
            return

        direction = phone.find_direction(phone.active_direction)
        channel = phone.find_channel(direction.channel)
        attributes['MAIN_SCREEN_ATTRIBUTE']['activeDirectionName'] = direction.name
        attributes['MAIN_SCREEN_ATTRIBUTE']['activeChannelName'] = channel.name

    def get_screen_name(self) -> str:
        return 'MAIN_SCREEN'
