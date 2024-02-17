from typing import Dict, Any

from service.common.utils import generate_uid
from service.screen.processor.save.save_screen_processor import SaveScreenProcessor
from service.session.models import Session, Channel


class ChannelEditorSaveScreenProcessor(SaveScreenProcessor):
    def process(self, session: Session, attributes: Dict[str, Any]):
        channel_id = attributes.get('CHANNEL_ID', None)
        if channel_id:
            index = next((i for i, ch in enumerate(session.channels) if ch.uid == channel_id), None)
            channel = session.channels[index]
            channel.mode = attributes.get('CHANNEL_MODE', None)
            session.channels[index] = channel
        else:
            channel = Channel()
            channel.uid = generate_uid()
            channel.mode = attributes.get('CHANNEL_MODE', None)
            session.channels.append(channel)


    def get_screen_name(self) -> str:
        return "CHANNEL_EDITOR"