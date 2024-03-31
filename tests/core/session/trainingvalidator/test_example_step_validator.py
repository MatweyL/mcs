import pytest

from service.core.session.training_validator.step_validator import ExampleStepValidator
from service.domain.session import Session, SessionStatus

validator = ExampleStepValidator(None, None)

DATA = [
    [Session(), False],
    [Session(status=SessionStatus.READY), False],
    [Session(status=SessionStatus.IN_WORK), True]
]


@pytest.fixture(params=DATA)
def is_valid_provider(request):
    return {"session": request.param[0], "expected": request.param[1]}


def test_is_valid(is_valid_provider):
    # GIVEN
    session = is_valid_provider["session"]

    # WHEN | THEN
    assert validator.is_valid(session) == is_valid_provider["expected"]


def test_get_step_message_code():
    assert validator.get_step_message_code() == "EXAMPLE_STEP_CODE"


def test_get_order():
    assert validator.get_order() == 1


def test_get_target_screen_code():
    assert validator.get_target_screen_code() == "CHANNEL_EDITOR"
