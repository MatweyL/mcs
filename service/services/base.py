from abc import abstractmethod
from typing import Dict, Any

from service.domain.phone import Phone
from service.schemas.screen import ScreenValues


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


class ScreenProcessorInterface:
    """
    Обработчик экрана
    """

    @abstractmethod
    def save(self, phone: Phone, screen: ScreenValues):
        """

        :param phone: доменный объект телефона
        :param screen: экран с данными

        :return:
        """
        pass

    @abstractmethod
    def get(self, phone: Phone, screen: Dict[str, Any], context: dict):
        """

        :param phone: доменный объект телефона
        :param screen: шаблон экрана
        :param context: контекст для заполнения

        :return: заполненный экран
        """
        pass

    @abstractmethod
    def get_screen_name(self):
        """
        :return: название обрабатываемого экрана
        """
        pass
