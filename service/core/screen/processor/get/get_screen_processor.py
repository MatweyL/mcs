from abc import abstractmethod
from typing import Dict, Any

from service.domain.session import Session


class GetScreenProcessor:
    @abstractmethod
    def process(self,
                session: Session,
                screen_template: Dict[str, Any],
                uid: str):
        pass

    @abstractmethod
    def get_screen_name(self) -> str:
        pass


class DefaultGetScreenProcessor:
    def process(self,
                session: Session,
                screen_template: Dict[str, Any],
                uid: str):
        return screen_template
