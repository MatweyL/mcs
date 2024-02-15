from abc import abstractmethod
from typing import Dict, Any, Optional

from service.core.use_case import UseCase, Request, VoidResponse


class ScreenValues(Request):
    name: str
    attributes: Dict[str, Any]


class SaveScreenUseCase(UseCase):
    @abstractmethod
    def apply(self, request: ScreenValues) -> VoidResponse:
        pass


class GetScreenRq(Request):
    screen_name: str
    uid: Optional[str]


class GetScreenUseCase:
    @abstractmethod
    def apply(self, request: GetScreenRq) -> VoidResponse:
        pass
