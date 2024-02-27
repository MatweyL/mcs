from typing import Dict, Any

from service.common.logs import logger
from service.core.screen.processor.get.get_screen_processor import GetScreenProcessor
from service.domain.session import Session


class ChannelEditorGetScreenProcessor(GetScreenProcessor):

    def process(self, session: Session, screen_template: Dict[str, Any], uid: str):
        logger.info('CHANNEL EDITOR PROCESSOR CALLED')
        if not uid:
            return

        found_channel = session.phone.find_channel(uid)
        if not found_channel:
            return

        attributes = screen_template['attributes']
        attributes['CHANNEL_ID']['value'] = found_channel.uid
        attributes['NAME']['value'] = found_channel.name
        attributes['CHANNEL_MODE']['value'] = found_channel.mode
        attributes['DOUBLE_FREQUENCY']['value'] = found_channel.double_frequency
        attributes['FREQUENCY']['value'] = found_channel.frequency
        attributes['FORBIDDEN_SEND']['value'] = found_channel.forbidden_send
        attributes['CTCSS']['value'] = found_channel.ctcss

    def get_screen_name(self) -> str:
        return "CHANNEL_EDITOR"
