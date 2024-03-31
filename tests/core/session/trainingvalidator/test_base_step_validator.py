from unittest.mock import Mock

import pytest

from service.common.screen_navigator import BackMovement, ForwardMovement
from service.core.session.training_validator.step_validator import BaseStepValidator
from service.domain.session import Session

CODES = ["CHANNEL_EDITOR", "DIRECTION_EDITOR"]


@pytest.fixture(params=CODES)
def screen_code(request):
    return request.param


def test_return_success_when_step_passed(screen_code):
    # GIVEN
    session = Session()

    step_validator = BaseStepValidator(None, None)
    step_validator.is_valid = Mock(return_value=True)

    # WHEN
    actual = step_validator.validate(screen_code, session)

    # THEN
    assert actual.success


def test_return_failure_when_step_not_passed_and_screen_code_is_target():
    # GIVEN
    mocked_message_source = mock_message_source("Message")
    step_validator = BaseStepValidator(None, mocked_message_source)

    step_validator.is_valid = Mock(return_value=False)
    step_validator.get_step_message_code = Mock(return_value="EXAMPLE_STEP_CODE")
    step_validator.get_target_screen_code = Mock(return_value="CHANNEL_EDITOR")

    session = Session()

    # WHEN
    actual = step_validator.validate("CHANNEL_EDITOR", session)

    # THEN
    assert not actual.success
    assert actual.message == "Message"
    mocked_message_source.get_message.assert_called_once_with("EXAMPLE_STEP_CODE")


def test_return_failure_when_step_not_passed_and_should_go_back():
    # GIVEN
    mocked_message_source = mock_message_source("Message")
    mocked_navigator = mock_navigator(BackMovement())
    step_validator = BaseStepValidator(mocked_navigator, mocked_message_source)

    step_validator.is_valid = Mock(return_value=False)
    step_validator.get_step_message_code = Mock(return_value="EXAMPLE_STEP_CODE")
    step_validator.get_target_screen_code = Mock(return_value="CHANNEL_EDITOR")

    session = Session()

    # WHEN
    actual = step_validator.validate("DIRECTION_EDITOR", session)

    # THEN
    assert not actual.success
    assert actual.message == "Message"
    mocked_message_source.get_message.assert_called_once_with("RETURN_BACK_CODE")

    mocked_navigator.navigate.assert_called_once_with("DIRECTION_EDITOR", "CHANNEL_EDITOR")


def test_return_failure_when_step_not_passed_and_should_go_forward():
    # GIVEN
    mocked_message_source = mock_message_source("Message")
    mocked_navigator = mock_navigator(ForwardMovement("CHANNEL_LIST"))
    step_validator = BaseStepValidator(mocked_navigator, mocked_message_source)

    step_validator.is_valid = Mock(return_value=False)
    step_validator.get_step_message_code = Mock(return_value="EXAMPLE_STEP_CODE")
    step_validator.get_target_screen_code = Mock(return_value="CHANNEL_EDITOR")

    session = Session()

    # WHEN
    actual = step_validator.validate("DIRECTION_EDITOR", session)

    # THEN
    assert not actual.success
    assert actual.message == "Message"
    mocked_message_source.get_message.assert_called_once_with("NEXT_SCREEN_CODE", "CHANNEL_LIST")

    mocked_navigator.navigate.assert_called_once_with("DIRECTION_EDITOR", "CHANNEL_EDITOR")


def test_get_order():
    # GIVEN
    validator = BaseStepValidator(None, None)

    spy = Mock(wraps=validator)
    get_order = Mock(return_value=1)
    spy.get_order = get_order

    # WHEN | THEN
    assert spy.get_order() == 1


def mock_message_source(message) -> Mock:
    get_message = Mock(return_value=message)

    message_source = Mock()
    message_source.get_message = get_message

    return message_source


def mock_navigator(movement):
    navigate = Mock(return_value=movement)

    navigator = Mock()
    navigator.navigate = navigate

    return navigator
