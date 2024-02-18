from abc import abstractmethod
from typing import Dict, Any

from service.session.models import Session


class GetScreenProcessor:
    @abstractmethod
    def process(self, session: Session, screen_template: Dict[str, Any]):
        pass

    @abstractmethod
    def get_screen_name(self) -> str:
        pass


class DefaultGetScreenProcessor:
    def process(self, session: Session, screen_template: Dict[str, Any]):
        return screen_template
