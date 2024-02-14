from service.domain.phone import Phone
from service.services.base import ScreensStorageInterface
from service.services.screens.filler import ScreenFiller


class ScreensManager:

    def __init__(self, phone: Phone, screen_filler: ScreenFiller, screens_storage: ScreensStorageInterface):
        self._phone = phone
        self._screen_filler = screen_filler
        self._screens_storage = screens_storage

    def get(self, screen_name: str) -> dict:
        return self._screens_storage.get(screen_name)

    def get_filled(self, screen_name: str, element_uid: str) -> dict:
        screen = self.get(screen_name)  # Получили пустой шаблон
        element = self._phone.get_element_by_uid(element_uid)  # Получили элемент телефона по uid
        filled_screen = self._screen_filler.fill(screen, element)  # Наполнили поля шаблона сохраненными данными
        return filled_screen
