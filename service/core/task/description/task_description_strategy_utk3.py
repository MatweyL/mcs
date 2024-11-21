from service.core.task.description.service import TaskDescriptionStrategy
from service.domain.training import TrainingType


class TaskDescriptionStrategyUTK3(TaskDescriptionStrategy):
    def get_description(self, training):
        return 'Задание УТК-3'

    def get_training_kind(self):
        return TrainingType.UTK3
