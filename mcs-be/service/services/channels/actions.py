from typing import Dict, Any

from service.common.logs import logger
from service.common.utils import generate_uid
from service.domain.base import get_attribute_from_dict
from service.domain.channels import Channel, channel_mode_schema_map
from service.domain.phone import Phone
from service.schemas.exceptions import NoChannelWithIdException, \
    AttributeNotSpecifiedException, WrongAttributeValueException


class GetChannelAction:

    def __init__(self, phone: Phone):
        self._phone = phone

    def get(self, channel_id: str) -> Channel:
        channel = self._phone.get_channel(channel_id)
        if not channel:
            logger.error(f"no channel with id ({channel_id})")
            raise NoChannelWithIdException
        logger.debug(f"found channel with id ({channel_id}): {channel}")
        return channel


class UpdateChannelAction:

    def __init__(self, phone: Phone):
        self._phone = phone

    def update(self, attributes: Dict[str, Any], channel: Channel):
        for name, value in attributes.items():
            try:
                channel.update_attribute(name, value)
            except ValueError:
                logger.error(f'cannot update attribute: {name}')


class CreateChannelAction:

    def __init__(self, phone: Phone):
        self._phone = phone

    def create(self, attributes: Dict[str, Any]):
        channel_mode = get_attribute_from_dict('CHANNEL_MODE', attributes)
        if not channel_mode:
            logger.error(f'attribute CHANNEL_MODE not defined: {attributes}')
            raise AttributeNotSpecifiedException('CHANNEL_MODE')
        channel_schema = channel_mode_schema_map.get(channel_mode)
        if not channel_schema:
            logger.error(f'attribute CHANNEL_MODE has wrong value: got {channel_mode}, '
                         f'but have {channel_mode_schema_map.keys()}')
            raise WrongAttributeValueException(channel_mode, channel_mode_schema_map.keys())
        channel_uid = generate_uid()
        channel = channel_schema(channel_uid=channel_uid, channel_mode=channel_mode)
        for name, value in attributes.items():
            channel.update_attribute(name, value)
        self._phone.add_channel(channel)
        logger.info(f'created channel with id ({channel_uid})')
