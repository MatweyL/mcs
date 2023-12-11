from typing import Dict, Any, Optional

from service.common.logs import logger
from service.domain.base import get_attribute_from_dict
from service.domain.channels import Channel
from service.domain.phone import Phone
from service.schemas.exceptions import NoChannelWithIdException
from service.services.base import PhoneObjectManagerInterface
from service.services.channels.actions import UpdateChannelAction, CreateChannelAction, GetChannelAction


class ChannelsManager(PhoneObjectManagerInterface):

    def __init__(self, phone: Phone):
        self._channel_updater = UpdateChannelAction(phone)
        self._channel_creator = CreateChannelAction(phone)
        self._channel_getter = GetChannelAction(phone)

    def save(self, attributes: Dict[str, Any]):
        try:
            channel_uid = get_attribute_from_dict('CHANNEL_UID', attributes)
            channel = self._channel_getter.get(channel_uid)
        except KeyError as e:
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

