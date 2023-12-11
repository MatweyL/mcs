from abc import abstractmethod
from typing import Dict, Any


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
