from typing import Dict, Any

from service.common.logs import logger
from service.core.processor.interfaces import GetScreenProcessorInterface
from service.domain.phone import Phone


class GetChannelListProcessor(GetScreenProcessorInterface):
    def get(self, phone: Phone, screen_template: Dict[str, Any], context: dict):
        logger.info(f"{self} called")
        for channel in phone.get_channels():
            attribute = {
                "type": "CARD_ITEM",
                "label": channel.name,
                "used": True,
                "id": channel.channel_uid
            }
            screen_template['attributes'][channel.name] = attribute
        return screen_template
