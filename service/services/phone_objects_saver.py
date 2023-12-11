from typing import Dict

from service.schemas.screen import ScreenUpdated
from service.common.logs import logger
from service.services.base import PhoneObjectManagerInterface


class PhoneObjectsSaver:

    def __init__(self, screen_manager_map: Dict[str, PhoneObjectManagerInterface]):
        self._screen_facade_map = screen_manager_map

    def save(self, screen_updated: ScreenUpdated):
        logger.debug(f'start saving {screen_updated.name}')
        try:
            manager = self._screen_facade_map[screen_updated.name]
        except KeyError:
            logger.warning(f"no facade for screen {screen_updated.name}")
        else:
            manager.save(screen_updated.attributes)
            logger.debug(f'saved {screen_updated.name} attributes')
