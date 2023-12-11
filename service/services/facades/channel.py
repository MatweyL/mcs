from typing import Dict, Any, Optional

from app.phone import channel_mode_schema_map, Channel
from service.common.logs import logger
from service.common.utils import generate_uid
from service.schemas.phone import Phone
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

    def get(self, channel_id: str) -> Optional[Channel]:
        try:
            channel = self._channel_getter.get(channel_id)
        except NoChannelWithIdException:
            pass
        else:
            return channel


class ChannelUpdater:

    def __init__(self, phone: Phone):
        self._phone = phone

    def update(self, attributes: Dict[str, Any], channel: Channel):
        for name, value in attributes.items():
            try:
                channel.update_attribute(name, value)
            except ValueError:
                logger.error(f'cannot update attribute: {name}')


class ChannelCreator:

    def __init__(self, phone: Phone):
        self._phone = phone

    def create(self, attributes: Dict[str, Any]):
        channel_mode = attributes.get('CHANNEL_MODE')
        if not channel_mode:
            logger.error(f'attribute CHANNEL_MODE not defined: {attributes}')
            raise AttributeNotSpecifiedException('CHANNEL_MODE')
        channel_schema = channel_mode_schema_map.get(channel_mode)
        if not channel_schema:
            logger.error(f'attribute CHANNEL_MODE has wrong value: got {channel_mode}, '
                         f'but have {channel_mode_schema_map.keys()}')
            raise WrongAttributeValueException(channel_mode, channel_mode_schema_map.keys())
        channel_id = generate_uid()
        channel = channel_schema(channel_id=channel_id, channel_mode=channel_mode)
        for name, value in attributes.items():
            channel.update_attribute(name, value)
        self._phone.add_channel(channel)
        logger.info(f'created channel with id ({channel_id})')


class ChannelGetter:

    def __init__(self, phone: Phone):
        self._phone = phone

    def get(self, channel_id: str) -> Channel:
        channel = self._phone.get_channel(channel_id)
        if not channel:
            logger.error(f"no channel with id ({channel_id})")
            raise NoChannelWithIdException
        logger.debug(f"found channel with id ({channel_id}): {channel}")
        return channel
