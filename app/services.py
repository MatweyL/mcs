import json
from pathlib import Path

from app.schemas import Screen


class ScreenBuilder:

    def __init__(self):
        pass

    def build(self, path_to_screen: str) -> Screen:
        screen_dict = json.loads(Path(path_to_screen).read_text(encoding='utf-8'))
        return Screen.model_validate(screen_dict)