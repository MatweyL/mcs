from abc import abstractmethod
from typing import Dict, Any

from service.domain.session import Session


class SaveScreenProcessor:
    @abstractmethod
    def process(self, session: Session, attributes: Dict[str, Any]):
        pass

    @abstractmethod
    def get_screen_name(self) -> str:
        pass
