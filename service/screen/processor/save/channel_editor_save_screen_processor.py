from typing import Dict, Any

from service.common.utils import generate_uid
from service.domain_v2.channel import Channel
from service.domain_v2.session import Session
from service.screen.processor.save.save_screen_processor import SaveScreenProcessor


class ChannelEditorSaveScreenProcessor(SaveScreenProcessor):
    def process(self, session: Session, attributes: Dict[str, Any]):
        channel_id = attributes.get('CHANNEL_ID')
        phone = session.phone
        if channel_id:
            index = next((i for i, ch in enumerate(phone.channels) if ch.uid == channel_id), None)
            channel = phone.channels[index]
            self._fill_channel(channel, attributes)
            phone.channels[index] = channel
        else:
            channel = Channel()
            channel.uid = generate_uid()
            self._fill_channel(channel, attributes)
            phone.channels.append(channel)

    def _fill_channel(self, channel: Channel, attributes: Dict[str, Any]):
        channel.mode = attributes.get('CHANNEL_MODE')
        channel.name = attributes.get('NAME')
        channel.double_frequency = attributes.get('DOUBLE_FREQUENCY')
        channel.frequency = attributes.get('FREQUENCY')
        channel.ctcss = attributes.get('CTCSS')
        channel.forbidden_send = attributes.get('FORBIDDEN_SEND')

    def get_screen_name(self) -> str:
        return "CHANNEL_EDITOR"
