from typing import Dict, Any

from service.common.logs import logger
from service.domain_v2.channel import Channel
from service.domain_v2.session import Session
from service.screen.processor.get.get_screen_processor import GetScreenProcessor


class ChannelEditorGetScreenProcessor(GetScreenProcessor):

    def process(self, session: Session, screen_template: Dict[str, Any], uid: str):
        logger.info('CHANNEL EDITOR PROCESSOR CALLED')
        if not uid:
            return screen_template
        attributes = screen_template['attributes']

        channels = session.phone.channels
        found_channel: Channel = None
        for channel in channels:
            if channel.uid == uid:
                found_channel = channel
                break
        if not found_channel:
            return screen_template
        attributes['CHANNEL_ID']['value'] = found_channel.uid
        attributes['NAME']['value'] = found_channel.name
        attributes['CHANNEL_MODE']['value'] = found_channel.mode
        attributes['DOUBLE_FREQUENCY']['value'] = found_channel.double_frequency
        attributes['FREQUENCY']['value'] = found_channel.frequency
        attributes['FORBIDDEN_SEND']['value'] = found_channel.forbidden_send
        attributes['CTCSS']['value'] = found_channel.ctcss
        return screen_template

    def get_screen_name(self) -> str:
        return "CHANNEL_EDITOR"
