from typing import Dict, Any

from service.domain_v2.channel import Channel
from service.domain_v2.session import Session
from service.screen.processor.get.get_screen_processor import GetScreenProcessor


class ChannelEditorGetScreenProcessor(GetScreenProcessor):

    def process(self, session: Session, screen_template: Dict[str, Any], uid: str):
        attributes = screen_template['attributes']

        channels = session.phone.channels
        found_channel: Channel = None
        for channel in channels:
            if channel.uid == uid:
                found_channel = channel
                break
        if not found_channel:
            raise Exception(f'no channel with uid={uid}')
        attributes['CHANNEL_ID']['value'] = found_channel.uid
        attributes['NAME']['value'] = found_channel.name
        attributes['MODE']['value'] = found_channel.mode
        return screen_template

    def get_screen_name(self) -> str:
        return "CHANNEL_EDITOR"
