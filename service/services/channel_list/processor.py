from typing import Dict, Any

from service.common.logs import logger
from service.common.utils import generate_uid
from service.domain.base import get_attribute_from_dict
from service.domain.channels import Channel, channel_mode_schema_map
from service.domain.phone import Phone
from service.schemas.screen import ScreenUpdated
from service.services.base import ScreenProcessorInterface


class ChannelListScreenProcessor(ScreenProcessorInterface):

    def __init__(self, screen_name) -> None:
        self.screen_name = screen_name

    def save(self, phone: Phone, screen: ScreenUpdated):
        """
        Без реализации, т.к. данный экран будет read-only
        """
        pass

    def get(self, phone: Phone, screen: Dict[str, Any], context: dict):
        logger.info("Get in ChannelListScreenProcessor")
        for channel in phone.get_channels():
            attribute = {
                "type": "CARD_ITEM",
                "label": channel.name,
                "used": True,
                "id": channel.channel_uid
            }
            screen['attributes'][channel.name] = attribute
        return screen

    def get_screen_name(self):
        return self.screen_name


class ChannelEditorScreenProcessor(ScreenProcessorInterface):

    def __init__(self, screen_name) -> None:
        self.screen_name = screen_name

    def save(self, phone: Phone, screen: ScreenUpdated):
        logger.info("Save in ChannelEditorScreenProcessor")
        attributes = screen.attributes
        logger.debug(screen.attributes)
        channel_uid = attributes.get('CHANNEL_ID', None)
        logger.debug(f'CHANNEL_ID - {channel_uid}')
        if channel_uid is not None:
            logger.debug("Get existed channel")
            channel = phone.get_channel(channel_uid)
        else:
            logger.debug("Create new channel")
            channel_mode = get_attribute_from_dict('CHANNEL_MODE', attributes)
            channel_uid = generate_uid()
            channel_schema = channel_mode_schema_map.get(channel_mode)

            channel = channel_schema(channel_uid=channel_uid, channel_mode=channel_mode)
            channel.forbidden_send = attributes['FORBIDDEN_SEND']
            channel.double_frequency = attributes['DOUBLE_FREQUENCY']
            channel.frequency = attributes['FREQUENCY']
            channel.ctcss = attributes['CTCSS']
            channel.name = attributes['NAME']

            phone.add_channel(channel)
            logger.info(phone.get_channels())


    def get(self, phone: Phone, screen: Dict[str, Any], context: dict):
        try:
            channel_uid = context['uid']
        except KeyError:
            return screen
        channel = phone.get_channel(channel_uid)
        # if channel.channel_mode == 'CHM25':
        screen['attributes']['MODE']['value'] = channel.channel_mode
        screen['attributes']['FORBIDDEN_SEND']['value'] = channel.forbidden_send
        screen['attributes']['DOUBLE_FREQUENCY']['value'] = channel.double_frequency
        screen['attributes']['FREQUENCY']['value'] = channel.frequency
        screen['attributes']['CTCSS']['value'] = channel.ctcss
        screen['attributes']['NAME']['value'] = channel.name

        return screen

    def get_screen_name(self):
        return self.screen_name


class DumbScreenProcessor(ScreenProcessorInterface):
    def __init__(self, screen_name) -> None:
        self.screen_name = screen_name

    def save(self, phone: Phone, screen: ScreenUpdated):
        """
        Без реализации, т.к. данный экран будет read-only
        """
        pass

    def get(self, phone: Phone, screen: Dict[str, Any], context: dict):
        """
        Возвращает по-умолчанию заполненный шаблон
        """
        logger.info(f'DumbScreenProcessor возвращает шаблон: {screen["name"]}')

        return screen

    def get_screen_name(self):
        return self.screen_name
