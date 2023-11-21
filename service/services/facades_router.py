from plistlib import Dict

from app.schemas import ScreenUpdated
from service.common.logs import logger
from service.services.base import AbstractFacade


class FacadesRouter:

    def __init__(self, screen_facade_map: Dict[str, AbstractFacade]):
        self._screen_facade_map = screen_facade_map

    def save(self, screen_updated: ScreenUpdated):
        try:
            facade = self._screen_facade_map[screen_updated.name]
        except KeyError:
            logger.warning(f"no facade for screen {screen_updated.name}")
        else:
            facade.save(screen_updated.attributes)
