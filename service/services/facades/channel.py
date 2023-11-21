from typing import Dict, Any

from app.phone import Phone, channel_mode_schema_map, Channel
from service.common.logs import logger
from service.common.utils import generate_uid
from service.services.exceptions import NoChannelWithIdException, \
    AttributeNotSpecifiedException, WrongAttributeValueException


class ChannelFacade:

    def __init__(self, phone: Phone):
        self._channel_updater = ChannelUpdater(phone)
        self._channel_creator = ChannelCreator(phone)
        self._channel_getter = ChannelGetter(phone)

    def _get_attribute(self, attributes: Dict[str, Any], name: str) -> Any:
        value = attributes.get(name)
        if not value:
            raise AttributeNotSpecifiedException(name)
        return value

    def save(self, attributes: Dict[str, Any]):
        try:
            channel_id = self._get_attribute(attributes, 'CHANNEL_ID')
            channel = self._channel_getter.get(channel_id)
        except AttributeNotSpecifiedException:
            self._channel_creator.create(attributes)
        except NoChannelWithIdException:
            return
        else:
            self._channel_updater.update(attributes, channel)

    def get(self):
        pass


class ChannelUpdater:

    def __init__(self, phone: Phone):
        self._phone = phone

    def update(self, attributes: Dict[str, Any], channel: Channel):
        for name, value in attributes.items():
            channel.update_attribute(name, value)


class ChannelCreator:

    def __init__(self, phone: Phone):
        self._phone = phone

    def create(self, attributes: Dict[str, Any]):
        channel_mode = attributes.get('CHANNEL_MODE')
        if not channel_mode:
            raise AttributeNotSpecifiedException('CHANNEL_MODE')
        channel_schema = channel_mode_schema_map.get(channel_mode)
        if not channel_schema:
            raise WrongAttributeValueException(channel_mode, channel_mode_schema_map.keys())
        channel_id = generate_uid()
        channel = channel_schema(channel_id=channel_id, channel_mode=channel_mode)
        for name, value in attributes.items():
            channel.update_attribute(name, value)
        self._phone.add_channel(channel)


class ChannelGetter:

    def __init__(self, phone: Phone):
        self._phone = phone

    def get(self, channel_id: str) -> Channel:
        channel = self._phone.get_channel(channel_id)
        if not channel:
            raise NoChannelWithIdException
        return channel
