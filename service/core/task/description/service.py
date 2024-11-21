from abc import abstractmethod
from typing import List

from service.domain.training import Training, TrainingType


class TaskDescriptionService:
    @abstractmethod
    def get_description(self, training: Training):
        pass


class TaskDescriptionStrategy:
    def get_description(self, training):
        pass

    def get_training_kind(self):
        pass


class TaskDescriptionServiceImpl(TaskDescriptionService):
    def __init__(self, strategies: List[TaskDescriptionStrategy]):
        self.strategies = strategies

    def get_description(self, training: Training):
        training_kind = TrainingType.from_name(training.kind)
        for strategy in self.strategies:
            if strategy.get_training_kind() == training_kind:
                return strategy.get_description(training)
