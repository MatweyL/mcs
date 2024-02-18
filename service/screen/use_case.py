from abc import abstractmethod
from typing import Dict, Any, Optional

from service.core.use_case import UseCase, Request, VoidResponse


class Screen(Request):
    name: str
    attributes: Dict[str, Any]


class SaveScreenRq(Request):
    session_id: str
    screen: Screen


class SaveScreenUseCase(UseCase):
    @abstractmethod
    def apply(self, request: SaveScreenRq) -> VoidResponse:
        pass


class GetScreenRq(Request):
    screen_name: str
    session_id: str
    uid: Optional[str]


class GetScreenUseCase:
    @abstractmethod
    def apply(self, request: GetScreenRq) -> VoidResponse:
        pass
