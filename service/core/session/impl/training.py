from datetime import timedelta
from typing import Dict

from service.common.logs import logger
from service.core.session import TrainingResult
from service.core.session.training import TrainingResultCalculatorStrategy, Mark, TrainingResultCalculatorService
from service.domain.session import Session


class DumbTrainingResultCalculatorStrategy(TrainingResultCalculatorStrategy):

    def __init__(self):
        self.timelimit_mark: Dict[timedelta, Mark] = {
            timedelta(seconds=60): Mark.FIVE,
            timedelta(seconds=120): Mark.FOUR,
            timedelta(seconds=180): Mark.THREE,
            timedelta(seconds=240): Mark.TWO,
            timedelta(seconds=300): Mark.ONE,
        }

    def calculate(self, session: Session) -> TrainingResult:
        attempt = len(session.attempts)
        last_attempt = session.attempts[-1]
        if not last_attempt.finished:
            mark = Mark.NOT_DEFINED
        else:
            attempt_duration = last_attempt.finished - last_attempt.started
            nearest_timelimit = None

            for timelimit in self.timelimit_mark:
                if attempt_duration <= timelimit:
                    if not nearest_timelimit or timelimit < nearest_timelimit:
                        nearest_timelimit = timelimit
            mark = self.timelimit_mark.get(nearest_timelimit, Mark.NOT_DEFINED)

        return TrainingResult(session_uid=session.uid,
                              attempt=attempt,
                              mark=mark)


class TrainingResultCalculatorServiceImpl(TrainingResultCalculatorService):
    def calculate(self, session: Session) -> TrainingResult:
        for strategy in self.strategies:
            if isinstance(strategy, DumbTrainingResultCalculatorStrategy):
                return strategy.calculate(session)
