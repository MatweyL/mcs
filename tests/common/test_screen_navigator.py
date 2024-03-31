import pytest

from service.common.impl.screen_navigator import ScreenNavigatorImpl
from service.common.screen_navigator import ScreenNavigator, ForwardMovement, BackMovement, NoMovement

GRAPH = {
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
}

navigator = ScreenNavigatorImpl(GRAPH)

FORWARD_PARAMS = [
    ["MAIN_SCREEN", "SERVICE_MENU", "SERVICE_MENU"],
    ["MAIN_SCREEN", "CHANNEL_EDITOR", "SERVICE_MENU"],
    ["MAIN_SCREEN", "DIRECTION_EDITOR", "SERVICE_MENU"],
    ["SERVICE_MENU", "DIRECTION_EDITOR", "DIRECTION_LIST"],
    # ["CHANNEL_LIST", "DIRECTION_EDITOR", "SERVICE_MENU"],
]


@pytest.fixture(params=FORWARD_PARAMS)
def forward_args(request):
    return {"now": request.param[0], "target": request.param[1], "expected_next": request.param[2]}


def test_navigate_to_next_forward_screen(forward_args):
    # GIVEN | WHEN
    actual = navigator.navigate(forward_args["now"], forward_args["target"])

    # THEN
    assert isinstance(actual, ForwardMovement)
    assert actual.next_screen_code == forward_args["expected_next"]


BACK_PARAMS = [
    ["SERVICE_MENU", "MAIN_SCREEN"],
    ["CHANNEL_EDITOR", "MAIN_SCREEN"],
    ["DIRECTION_EDITOR", "MAIN_SCREEN"],
    ["DIRECTION_EDITOR", "SERVICE_MENU"],
    ["DIRECTION_EDITOR", "CHANNEL_LIST"],
]


@pytest.fixture(params=BACK_PARAMS)
def back_args(request):
    return {"now": request.param[0], "target": request.param[1]}


def test_navigate_to_back_screen(back_args):
    # GIVEN | WHEN
    actual = navigator.navigate(back_args["now"], back_args["target"])

    # THEN
    assert isinstance(actual, BackMovement)


NO_MOVEMENT_PARAMS = [
    ["SERVICE_MENU", "SERVICE_MENU"],
    ["CHANNEL_EDITOR", "CHANNEL_EDITOR"],
    ["MAIN_SCREEN", "MAIN_SCREEN"],
    [None, None],
]


@pytest.fixture(params=NO_MOVEMENT_PARAMS)
def no_move_args(request):
    return {"now": request.param[0], "target": request.param[1]}


def test_navigate_no_movement(no_move_args):
    # GIVEN | WHEN
    actual = navigator.navigate(no_move_args["now"], no_move_args["target"])

    # THEN
    assert isinstance(actual, NoMovement)
