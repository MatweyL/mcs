from typing import Dict, Any

from service.common.logs import logger
from service.core.processor.interfaces import GetScreenProcessorInterface
from service.domain.phone import Phone


class GetChannelEditorProcessor(GetScreenProcessorInterface):
    def get(self, phone: Phone, screen_template: Dict[str, Any], context: dict) -> dict:
        try:
            channel_uid = context['uid']
        except KeyError:
            return screen_template
        channel = phone.get_channel(channel_uid)
        channel_dict = channel.model_dump()
        for attribute_name in channel_dict:
            try:
                screen_template_attribute = screen_template['attributes'][attribute_name]
            except KeyError as e:
                logger.error(f'{self} exception while screen saving: {e}')
            else:
                screen_template_attribute['value'] = channel_dict[attribute_name]
        # if channel.channel_mode == 'CHM25':
        #     screen_template['attributes']['MODE']['value'] = channel.channel_mode
        #     screen_template['attributes']['FORBIDDEN_SEND']['value'] = channel.forbidden_send
        #     screen_template['attributes']['DOUBLE_FREQUENCY']['value'] = channel.double_frequency
        #     screen_template['attributes']['FREQUENCY']['value'] = channel.frequency
        #     screen_template['attributes']['CTCSS']['value'] = channel.ctcss
        #     screen_template['attributes']['NAME']['value'] = channel.name

        return screen_template
