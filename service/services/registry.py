from typing import List

from service.schemas.exceptions import NoProcessorWithScreenNameException
from service.services.base import ScreenProcessorInterface


class ScreenProcessorRegistry:
    """
    Регистр обработчиков экрана
    """

    def __init__(self, processors: List[ScreenProcessorInterface]):
        self.processors = processors

    def get(self, screen_name: str):
        for processor in self.processors:
            if processor.get_screen_name() == screen_name:
                return processor
        raise NoProcessorWithScreenNameException(screen_name)
