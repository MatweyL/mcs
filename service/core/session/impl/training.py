import datetime
from datetime import timedelta
from typing import Dict

from service.common.logs import logger
from service.core.session import TrainingResult
from service.core.session.training import TrainingResultCalculatorStrategy, Mark, TrainingResultCalculatorService
from service.domain.session import Session, TrainingType


class CalculateMarkByTime:
    def __init__(self, mark_by_timedelta: Dict[timedelta, Mark]):
        self.mark_by_timedelta = mark_by_timedelta

    def calculate(self, session: Session) -> TrainingResult:
        last_attempt = session.attempts[-1]
        if not last_attempt.finished:
            attempt_duration = datetime.datetime.now() - last_attempt.started
        else:
            attempt_duration = last_attempt.finished - last_attempt.started
        nearest_timelimit = None
        for timelimit in self.mark_by_timedelta:
            if attempt_duration <= timelimit:
                if not nearest_timelimit or timelimit < nearest_timelimit:
                    nearest_timelimit = timelimit
        mark = self.mark_by_timedelta.get(nearest_timelimit, Mark.ONE)

        attempt = len(session.attempts)
        return TrainingResult(session_uid=session.uid,
                              attempt=attempt,
                              mark=mark,
                              duration=attempt_duration.seconds)


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
            attempt_duration = datetime.datetime.now() - last_attempt.started
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
                              mark=mark,
                              duration=attempt_duration.seconds)

    def get_name(self):
        return 'default'


class UTK2ResultCalculatorStrategy(TrainingResultCalculatorStrategy):

    def __init__(self, mark_by_time_calculator: CalculateMarkByTime):
        self.mark_by_time_calculator = mark_by_time_calculator

    def calculate(self, session: Session) -> TrainingResult:
        training_result = self.mark_by_time_calculator.calculate(session)

        target_channel = None
        for channel in session.phone.channels:
            if channel.name == 'КР1' and channel.frequency == 45775000 and channel.mode == 'CHM25':
                target_channel = channel
                break
        if not target_channel:
            logger.info(f'{session.uid} has not correct channel')
            training_result.mark = Mark.ONE
            return training_result
        has_correct_direction = any(direction.channel == target_channel.uid for direction in session.phone.directions)
        if not has_correct_direction:
            logger.info(f'{session.uid} has not correct direction')
            training_result.mark = Mark.ONE
            return training_result
        return training_result

    def get_name(self):
        return TrainingType.UTK2


class UTK3ResultCalculatorStrategy(TrainingResultCalculatorStrategy):

    def __init__(self, mark_by_time_calculator: CalculateMarkByTime):
        self.mark_by_time_calculator = mark_by_time_calculator

    def calculate(self, session: Session) -> TrainingResult:
        training_result = self.mark_by_time_calculator.calculate(session)

        target_channel = None
        for channel in session.phone.channels:
            if channel.name == 'КВ2' and channel.frequency == 50500000 and channel.mode == 'CHM50':
                target_channel = channel
                break
        if not target_channel:
            logger.info(f'{session.uid} has not correct channel')
            training_result.mark = Mark.ONE
            return training_result
        has_correct_direction = any(direction.channel == target_channel.uid for direction in session.phone.directions)
        if not has_correct_direction:
            logger.info(f'{session.uid} has not correct direction')
            training_result.mark = Mark.ONE
            return training_result
        return training_result

    def get_name(self):
        return TrainingType.UTK3


class TrainingResultCalculatorServiceImpl(TrainingResultCalculatorService):
    def calculate(self, session: Session) -> TrainingResult:
        for strategy in self.strategies:
            if strategy.get_name() == session.training.kind:
                return strategy.calculate(session)
        return self.default_strategy.calculate(session)
