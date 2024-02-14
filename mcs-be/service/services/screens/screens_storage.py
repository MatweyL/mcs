import json
from pathlib import Path

from service.common.logs import logger
from service.services.base import ScreensStorageInterface


class FileSystemScreensStorage(ScreensStorageInterface):

    def __init__(self, screens_dir_path: Path):
        self._screens_dir_path = screens_dir_path

    def get(self, screen_name: str) -> dict:
        """
        :param screen_name: название экрана. В текущей реализации это название директории,
                            в которой находится screen.json
        :return: шаблон экрана
        """
        screen_dir_path = self._screens_dir_path.joinpath(screen_name).joinpath('screen.json')
        try:
            screen_raw = screen_dir_path.read_text('utf-8')
        except FileNotFoundError as e:
            logger.exception(e)
        else:
            return json.loads(screen_raw)
