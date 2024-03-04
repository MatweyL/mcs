from abc import ABC, abstractmethod
from dataclasses import dataclass
from enum import Enum
from typing import List

from service.domain.session import Session


class Mark(str, Enum):
    FIVE = '5'
    FOUR = '4'
    THREE = '3'
    TWO = '2'
    ONE = '1'
    NOT_DEFINED = 'УТК не закончен'


@dataclass
class TrainingResult:
    duration: float  # длительность выполнения комплекса, секунд
    session_uid: str  # идентификатор сессии
    mark: Mark  # оценка
    attempt: int  # номер попытки


class TrainingResultCalculatorStrategy(ABC):

    @abstractmethod
    def calculate(self, session: Session) -> TrainingResult:
        pass

    @abstractmethod
    def get_name(self):
        pass


class TrainingResultCalculatorService(ABC):
    def __init__(self, strategies: List[TrainingResultCalculatorStrategy],
                 default_strategy: TrainingResultCalculatorStrategy):
        self.strategies = strategies
        self.default_strategy = default_strategy

    @abstractmethod
    def calculate(self, session: Session) -> TrainingResult:
        pass
