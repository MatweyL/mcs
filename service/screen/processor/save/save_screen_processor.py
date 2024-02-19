from abc import abstractmethod
from typing import Dict, Any

from service.domain_v2.session import Session


class SaveScreenProcessor:
    @abstractmethod
    def process(self, session: Session, attributes: Dict[str, Any]):
        pass

    @abstractmethod
    def get_screen_name(self) -> str:
        pass
