from typing import Dict, Any

from service.core.screen.processor.save import SaveScreenProcessor
from service.domain.session import Session


class SelectActiveDirectionSaveScreenProcessor(SaveScreenProcessor):
    def process(self, session: Session, attributes: Dict[str, Any]):
        phone = session.phone
        phone.active_direction = self.get_active_direction(attributes)

    @staticmethod
    def get_active_direction(attributes: Dict[str, Any]):
        for attribute in attributes:
            if attributes[attribute]:
                return attribute

    def get_screen_name(self, *args, **kwargs) -> str:
        return "SELECT_ACTIVE_DIRECTION"
