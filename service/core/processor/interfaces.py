from abc import abstractmethod, ABC
from typing import Dict, Any

from service.domain.phone import Phone
from service.schemas.screen import ScreenValues


class ScreenProcessorInterface(ABC):
    """
    Обработчик экрана
    """
    def __init__(self, screen_name: str = None):
        self._screen_name = screen_name

    def get_screen_name(self):
        """
        :return: название обрабатываемого экрана
        """
        return self._screen_name



class GetScreenProcessorInterface(ScreenProcessorInterface):
    """
    Обработчик получения экрана
    """

    @abstractmethod
    def get(self, phone: Phone, screen_template: Dict[str, Any], context: dict):
        """

        :param phone: доменный объект телефона
        :param screen_template: шаблон экрана
        :param context: контекст для заполнения

        :return: заполненный экран
        """
        pass


class SaveScreenProcessorInterface(ScreenProcessorInterface):
    """
    Обработчик сохранение экрана
    """

    @abstractmethod
    def save(self, phone: Phone, screen_values: ScreenValues):
        """

        :param phone: доменный объект телефона
        :param screen_values: экран с данными

        :return:
        """
        pass
