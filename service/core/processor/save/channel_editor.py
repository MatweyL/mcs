from service.common.logs import logger
from service.common.utils import generate_uid
from service.core.processor.interfaces import SaveScreenProcessorInterface
from service.domain.base import get_attribute_from_dict
from service.domain.channels import channel_mode_schema_map
from service.domain.phone import Phone
from service.schemas.screen import ScreenValues


class SaveChannelEditorProcessor(SaveScreenProcessorInterface):
    def save(self, phone: Phone, screen_values: ScreenValues):
        logger.info(f"{self} called")
        attributes = screen_values.attributes
        logger.debug(screen_values.attributes)
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
