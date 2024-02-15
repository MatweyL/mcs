from abc import abstractmethod
from typing import Dict, Any

from service.domain.phone import Phone
from service.schemas.screen import ScreenUpdated


class PhoneObjectManagerInterface:

    @abstractmethod
    def save(self, attributes: Dict[str, Any]):
        pass

    @abstractmethod
    def get(self, uid: str) -> Any:
        pass


class ScreensStorageInterface:

    @abstractmethod
    def get(self, screen_name: str) -> dict:
        pass


class PhoneStorageInterface:

    @abstractmethod
    def load_phone(self, uid: str = None) -> Phone:
        pass

    @abstractmethod
    def save_phone(self, phone: Phone):
        pass
