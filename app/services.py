import json
import os.path
from pathlib import Path

from app.schemas import Screen


class ScreenBuilder:

    def __init__(self, screens_path: str):
        self._screens_path = screens_path
        pass

    def build(self, screen_name: str) -> Screen:
        screen_path = os.path.join(self._screens_path, screen_name)
        screen_dict = json.loads(Path(screen_path).read_text(encoding='utf-8'))
        return Screen.model_validate(screen_dict)
