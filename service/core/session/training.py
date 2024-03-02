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


@dataclass
class TrainingResult:
    session_uid: str  # идентификатор сессии
    mark: Mark  # оценка
    attempt: int  # номер попытки


class TrainingResultCalculatorStrategy(ABC):

    @abstractmethod
    def calculate(self, session: Session) -> TrainingResult:
        pass


class TrainingResultCalculatorService(ABC):
    def __init__(self, strategies: List[TrainingResultCalculatorStrategy]):
        self.strategies = strategies

    @abstractmethod
    def calculate(self, session: Session) -> TrainingResult:
        pass
