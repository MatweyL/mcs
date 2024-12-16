from abc import abstractmethod
from typing import Dict, Any, Optional, List

from pydantic import BaseModel

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


class NavigatorContext(BaseModel):
    navigation_steps: List['NavigationStep']


class NavigationStep(BaseModel):
    name: str
    id: Optional[str] = None


class GetScreenRq(Request):
    screen_name: str
    session_id: str
    uid: Optional[str]
    navigation_steps: List[NavigationStep]


class GetScreenUseCase:
    @abstractmethod
    def apply(self, request: GetScreenRq) -> dict:
        pass


class RemoveElementScreenUseCase:
    @abstractmethod
    def apply(self, request: GetScreenRq) -> VoidResponse:
        pass
