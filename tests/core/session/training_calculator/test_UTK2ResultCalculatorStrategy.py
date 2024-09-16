from service.core.session.training import Mark
from service.domain.session import Session


def test_mark_five(utk2_calculator, phone_with_correct_utk2_settings, attempt_five):
    session = Session(phone=phone_with_correct_utk2_settings, attempts=[attempt_five])
    result = utk2_calculator.calculate(session)
    assert result.mark == Mark.FIVE


def test_mark_four(utk2_calculator, phone_with_correct_utk2_settings, attempt_four):
    session = Session(phone=phone_with_correct_utk2_settings, attempts=[attempt_four])
    result = utk2_calculator.calculate(session)
    assert result.mark == Mark.FOUR


def test_mark_three(utk2_calculator, phone_with_correct_utk2_settings, attempt_three):
    session = Session(phone=phone_with_correct_utk2_settings, attempts=[attempt_three])
    result = utk2_calculator.calculate(session)
    assert result.mark == Mark.THREE


def test_mark_one(utk2_calculator, phone_with_correct_utk2_settings, attempt_one):
    session = Session(phone=phone_with_correct_utk2_settings, attempts=[attempt_one])
    result = utk2_calculator.calculate(session)
    assert result.mark == Mark.ONE
