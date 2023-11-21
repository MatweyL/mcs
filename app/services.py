import json
import os.path
from pathlib import Path

from app.logs import logger
from app.schemas import Screen


class ScreenBuilder:

    def __init__(self, screens_path: str):
        self._screens_path = screens_path

    def build(self, screen_name: str) -> Screen:
        if '.json' not in screen_name:
            screen_name += '.json'
        screen_path = os.path.join(self._screens_path, screen_name)
        logger.debug(f'screen path: {screen_path}')
        screen_dict = json.loads(Path(screen_path).read_text(encoding='utf-8'))
        return Screen.model_validate(screen_dict)
