from typing import List

from service.core.screen.processor.remove.remove_screen_element_processor import RemoveScreenElementProcessor


class RemoveScreenElementProcessorRegistry:
    def __init__(self,
                 processors: List[RemoveScreenElementProcessor]):
        self._processors = processors

    def get_processor(self, screen_name: str):
        for processor in self._processors:
            if processor.get_screen_name() == screen_name:
                return processor
        raise NotImplementedError(f"Не реализовано удаление для экрана {screen_name}")
