import json
import os.path
from datetime import datetime
from pathlib import Path
from uuid import uuid4


def get_root_path() -> Path:
    return Path(__file__).parent.parent.parent


def get_screens_path() -> str:
    return os.path.join(get_root_path(), 'screens')


def generate_uid() -> str:
    return str(uuid4())


date_pattern = '%d/%m/%y %H:%M'


def now() -> str:
    return datetime.now().strftime(date_pattern)


def from_str_to_datetime(dt_str: str) -> datetime:
    return datetime.strptime(dt_str, date_pattern)


def update_screen_by_alias():
    screens_path = get_root_path().joinpath('mcs-ui/public/screen')
    screen_by_alias_path = get_root_path().joinpath('service/db/screen_by_alias.json')
    screen_by_alias = json.loads(screen_by_alias_path.read_text('utf-8'))

    screen_names = {screen_name for screen_name in os.listdir(screens_path)}

    not_in_screen_by_alias = screen_names.difference(screen_by_alias)
    for screen_name in not_in_screen_by_alias:
        screen_by_alias[screen_name] = screen_name
    screen_by_alias_path.write_text(json.dumps(screen_by_alias, indent=2))
