from typing import Dict, Any

from service.common.logs import logger
from service.core.processor.interfaces import SaveScreenProcessorInterface, GetScreenProcessorInterface
from service.domain.phone import Phone
from service.schemas.screen import ScreenValues


class DefaultProcessor(GetScreenProcessorInterface, SaveScreenProcessorInterface):
    def get(self, phone: Phone, screen_template: Dict[str, Any], context: dict):
        logger.warning(f'{self} called')
        return screen_template

    def save(self, phone: Phone, screen_values: ScreenValues):
        logger.warning(f'{self} called')
