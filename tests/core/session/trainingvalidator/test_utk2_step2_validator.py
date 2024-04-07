import pytest

from service.core.session.training_validator.step_validator import UTK2Step2Validator
from service.domain.channel import Channel
from service.domain.direction import Direction
from service.domain.phone import Phone
from service.domain.session import Session


@pytest.fixture()
def validator_f(screen_navigator_f, message_source_f):
    return UTK2Step2Validator(screen_navigator_f, message_source_f)


DATA = [
    [Session(phone=Phone()), False],
    [Session(phone=Phone(channels=[Channel(mode='CHM50')])), False],
    [Session(phone=Phone(channels=[Channel(mode='CHM25',
                                           frequency=45775000,
                                           name='КР1'),
                                   Channel(mode='CHM25',
                                           frequency=45775000,
                                           name='КР2')
                                   ],
                         directions=[Direction(channel='КР2')])), False],
    [Session(phone=Phone(channels=[Channel(uid='842ef8f0-7c91-4c1f-888b-42d3de3c8824',
                                           mode='CHM25',
                                           frequency=45775000,
                                           name='КР1')],
                         directions=[Direction(channel='842ef8f0-7c91-4c1f-888b-42d3de3c8824')])), True],
    [Session(phone=Phone(channels=[Channel(mode='CHM50'),
                                   Channel(uid='842ef8f0-7c91-4c1f-888b-42d3de3c8824',
                                           mode='CHM25',
                                           frequency=45775000,
                                           name='КР1')],
                         directions=[Direction(channel='842ef8f0-7c91-4c1f-888b-42d3de3c8824')])), True],
]


@pytest.fixture(params=DATA)
def is_valid_provider(request):
    return {"session": request.param[0], "expected": request.param[1]}


def test_is_valid(is_valid_provider, validator_f):
    # GIVEN
    session = is_valid_provider["session"]

    # WHEN | THEN
    assert validator_f.is_valid(session) == is_valid_provider["expected"]


def test_get_step_message_code(validator_f):
    assert validator_f.get_step_message_code() == "UTK_2_STEP_2_CODE"


def test_get_order(validator_f):
    assert validator_f.get_order() == 2


def test_get_target_screen_code(validator_f):
    assert validator_f.get_target_screen_code() == "DIRECTION_EDITOR"
