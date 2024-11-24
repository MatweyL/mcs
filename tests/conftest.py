from datetime import timedelta, datetime
from random import randint
from typing import List, Dict
from uuid import uuid4

import pytest

from service.core.group.repo import GroupRepo
from service.core.session import SessionRepo
from service.core.session.impl.training import CalculateMarkByTime, TrainingResultCalculatorServiceImpl, \
    UTK2ResultCalculatorStrategy, UTK3ResultCalculatorStrategy, DumbTrainingResultCalculatorStrategy
from service.core.session.training import Mark
from service.core.students_marks.impl.students_marks import GetStudentsMarksTableUseCaseImpl
from service.domain.group import Group
from service.domain.phone import Phone
from service.domain.session import Session, SessionAttempt, SessionType
from service.domain.user import User


@pytest.fixture()
def phone():
    return Phone()


@pytest.fixture()
def training_result_calculator():
    calculate_mark_by_time_120_150_180 = CalculateMarkByTime({timedelta(seconds=120): Mark.FIVE,
                                                              timedelta(seconds=150): Mark.FOUR,
                                                              timedelta(seconds=180): Mark.THREE, })
    calculator = TrainingResultCalculatorServiceImpl(
        [UTK2ResultCalculatorStrategy(calculate_mark_by_time_120_150_180),
         UTK3ResultCalculatorStrategy(calculate_mark_by_time_120_150_180), ],
        DumbTrainingResultCalculatorStrategy())
    return calculator


@pytest.fixture()
def dumb_training_calculator():
    calculator = TrainingResultCalculatorServiceImpl([], DumbTrainingResultCalculatorStrategy())
    return calculator


@pytest.fixture()
def mock_group_repo():
    class MockGroupRepo(GroupRepo):
        def get_groups(self) -> List[Group]:
            pass

        def get_users_in_group(self, group_id: str) -> List[User]:
            return [User(uid='1', name="Павел", surname="Колокольцев", patronymic="Симонович"),
                    User(uid='2', name="Умат", surname="Васильев", patronymic="Дроздович"),
                    User(uid='3', name="Евгений", surname="Инкризов"), ]

    return MockGroupRepo()


def generate_mock_session(title: str, date: str, session_type: SessionType = SessionType.EXAM, ) -> Session:
    datetime_now = datetime.now()
    return Session(uid=str(uuid4()),
                   title=title,
                   date=date,
                   attempts=[SessionAttempt(started=datetime_now - timedelta(seconds=randint(30, 250)),
                                            finished=datetime_now)],

                   type=session_type, )


@pytest.fixture()
def mock_session_repo():
    class MockSessionRepo(SessionRepo):

        def __init__(self):
            self._sessions_by_user_uid: Dict[str, List[Session]] = {
                '1': [generate_mock_session('УТК-2', date='11/11/24 13:44'),
                      generate_mock_session('УТК-3', date='11/11/24 15:20'),
                      generate_mock_session('УТК-4', date='18/11/24 11:50')],

                '2': [generate_mock_session('УТК-2', date='11/11/24 13:44'),
                      generate_mock_session('УТК-3', date='11/11/24 15:20'),
                      generate_mock_session('УТК-4', date='18/11/24 11:50', session_type=SessionType.TRAINING)],
                '3': [generate_mock_session('УТК-2', date='11/11/24 13:44'),
                      generate_mock_session('УТК-3', date='11/11/24 15:20')],
            }

        def get_sessions(self, user_id: str) -> List[Session]:
            return self._sessions_by_user_uid[user_id]

        def save_session(self, session: Session) -> Session:
            pass

        def get_session(self, session_id: str) -> Session:
            pass

        def get_all_sessions(self) -> List[Session]:
            pass

    return MockSessionRepo()


@pytest.fixture()
def get_students_marks_table_use_case(dumb_training_calculator, mock_group_repo, mock_session_repo):
    return GetStudentsMarksTableUseCaseImpl(dumb_training_calculator, mock_session_repo, mock_group_repo)
