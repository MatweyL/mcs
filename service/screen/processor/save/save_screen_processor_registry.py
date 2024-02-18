from typing import List

from service.screen.processor.save.save_screen_processor import SaveScreenProcessor


class SaveScreenProcessorRegistry:
    def __init__(self,
                 processors: List[SaveScreenProcessor]):
        self._processors = processors

    def get_processor(self, screen_name: str):
        for processor in self._processors:
            if processor.get_screen_name() == screen_name:
                return processor
