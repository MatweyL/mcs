import os.path
from pathlib import Path
from uuid import uuid4


def get_root_path() -> Path:
    return Path(__file__).parent.parent.parent


def get_screens_path() -> str:
    return os.path.join(get_root_path(), 'screens')


def generate_uid() -> str:
    return str(uuid4())
