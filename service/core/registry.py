from typing import List

from service.core.processor.interfaces import ScreenProcessorInterface


class ScreenProcessorRegistry:
    """
    Регистр обработчиков экрана
    """

    def __init__(self,
                 processors: List[ScreenProcessorInterface],
                 default_processor: ScreenProcessorInterface):
        self._processors = processors
        self._default_processor = default_processor

    def get(self, screen_name: str):
        for processor in self._processors:
            if processor.get_screen_name() == screen_name:
                return processor
        return self._default_processor
