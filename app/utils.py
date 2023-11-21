import os.path
from pathlib import Path


def get_root_path() -> Path:
    return Path(__file__).parent.parent


def get_screens_path() -> str:
    return os.path.join(get_root_path(), 'screens')
