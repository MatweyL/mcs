from typing import List, Generator, Any, Optional

from service.common.logs import logger
from service.domain.channels import Channel


class Phone:

    def __init__(self, channels: List[Channel]):
        self._channels = channels

    def iter_channels(self) -> Generator[Channel, Any, None]:
        for channel in self._channels:
            yield channel

    def get_channels(self) -> List[Channel]:
        return list(self.iter_channels())

    def add_channel(self, channel: Channel):
        self._channels.append(channel)

    def get_channel(self, channel_uid: str) -> Optional[Channel]:
        for channel in self._channels:
            if channel.channel_uid == channel_uid:
                return channel

    def get_element_by_uid(self, uid: str):
        """ Ищет во всех полях телефона объект с заданным атрибутом id """
        for channel in self._channels:
            if channel.channel_uid == uid:
                return channel
        logger.warning(f'not found attribute with id: {uid}')
