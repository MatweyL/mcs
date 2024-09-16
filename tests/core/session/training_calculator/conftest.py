from datetime import timedelta, datetime

import pytest

from service.common.utils import generate_uid
from service.core.session.impl.training import UTK2ResultCalculatorStrategy, CalculateMarkByTime
from service.core.session.training import Mark
from service.domain.channel import Channel
from service.domain.direction import Direction
from service.domain.phone import Phone
from service.domain.session import SessionAttempt


@pytest.fixture
def phone_with_correct_utk2_settings():
    channel_uid = generate_uid()
    return Phone(channels=[Channel(uid=channel_uid, mode='CHM25', name='КР1',
                                   frequency=45775000)],
                 directions=[Direction(uid=generate_uid(),
                                       channel=channel_uid)])


@pytest.fixture
def attempt_five():
    now = datetime.now()
    return SessionAttempt(started=now - timedelta(seconds=110),
                          finished=now)


@pytest.fixture
def attempt_four():
    now = datetime.now()
    return SessionAttempt(started=now - timedelta(seconds=140),
                          finished=now)


@pytest.fixture
def attempt_three():
    now = datetime.now()
    return SessionAttempt(started=now - timedelta(seconds=160),
                          finished=now)


@pytest.fixture
def attempt_one():
    now = datetime.now()
    return SessionAttempt(started=now - timedelta(seconds=190),
                          finished=now)


@pytest.fixture
def utk2_calculator():
    return UTK2ResultCalculatorStrategy(CalculateMarkByTime({timedelta(seconds=120): Mark.FIVE,
                                                             timedelta(seconds=150): Mark.FOUR,
                                                             timedelta(seconds=180): Mark.THREE, }))
