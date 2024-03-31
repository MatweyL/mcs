import json

import pytest

from service.common.impl.message_source import MessageSourceImpl
from service.common.impl.screen_navigator import ScreenNavigatorImpl
from service.common.utils import get_root_path


@pytest.fixture()
def screen_navigator_f():
    return ScreenNavigatorImpl({
        "MAIN_SCREEN": [
            "SERVICE_MENU",
        ],
        "SERVICE_MENU": [
            "CHANNEL_LIST",
            "DIRECTION_LIST",
        ],
        "CHANNEL_LIST": [
            "CHANNEL_EDITOR"
        ],
        "DIRECTION_LIST": [
            "DIRECTION_EDITOR"
        ]
    })


@pytest.fixture()
def message_source_f():
    message_by_code_path = get_root_path().joinpath('service/db/message_by_code.json')
    message_by_code = json.loads(message_by_code_path.read_text('utf-8'))
    return MessageSourceImpl(message_by_code)
