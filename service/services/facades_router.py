import json
import os
from pathlib import Path
from typing import Dict

from app.schemas import ScreenUpdated
from service.common.logs import logger
from service.common.utils import get_root_path
from service.schemas.phone import Phone
from service.services.base import AbstractFacade
from service.services.fillers import ScreenFiller


class FacadesRouter:

    def __init__(self, phone: Phone,
                 screen_filler: ScreenFiller,
                 screen_facade_map: Dict[str, AbstractFacade],
                 screen_path_map: Dict[str, str]):
        self._phone = phone
        self._screen_filler = screen_filler
        self._screen_facade_map = screen_facade_map
        self._screen_path_map = screen_path_map

    def save(self, screen_updated: ScreenUpdated):
        logger.debug(f'start saving {screen_updated.name}')
        try:
            facade = self._screen_facade_map[screen_updated.name]
        except KeyError:
            logger.warning(f"no facade for screen {screen_updated.name}")
        else:
            facade.save(screen_updated.attributes)
            logger.debug(f'saved {screen_updated.name} attributes')

    def get(self, screen_name: str) -> dict:
        screen_full_path = os.path.join(get_root_path(), self._screen_path_map.get(screen_name))
        screen_str = Path(screen_full_path).read_text('utf-8')
        screen = json.loads(screen_str)
        return screen

    def get_filled(self, screen_name: str, id: str) -> dict:
        screen = self.get(screen_name)  # Получили пустой шаблон
        element = self._phone.get_element_by_id(id)  # Получили элемент телефона по id
        filled_screen = self._screen_filler.fill(screen, element)  # Наполнили поля шаблона сохраненными данными
        return filled_screen

