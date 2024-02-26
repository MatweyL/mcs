from typing import List

from service.core.screen.processor.get.get_screen_processor import GetScreenProcessor, DefaultGetScreenProcessor


class GetScreenProcessorRegistry:
    def __init__(self,
                 processors: List[GetScreenProcessor],
                 default_processor: DefaultGetScreenProcessor):
        self._processors = processors
        self.default_processor = default_processor

    def get_processor(self, screen_name: str):
        for processor in self._processors:
            if processor.get_screen_name() == screen_name:
                return processor
        return self.default_processor
