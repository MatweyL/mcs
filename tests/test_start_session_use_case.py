from service.core.session import StartSessionRq, FinishSessionRq
from service.di import start_session_use_case, finish_session_use_case
from service.domain.session import SessionStatus


def test_start_session_use_case():
    res = start_session_use_case.apply(StartSessionRq(session_uid='db3017cf-35fa-4417-9e40-58b7d9d1d4a5'))
    assert res.session_status == SessionStatus.IN_WORK


def test_finish_session_use_case():
    res = finish_session_use_case.apply(FinishSessionRq(session_uid='db3017cf-35fa-4417-9e40-58b7d9d1d4a5'))
    assert res.training_result.attempt == 1
