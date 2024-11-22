from service.core.task.description.service import TaskDescriptionStrategy
from service.domain.training import TrainingType, UTK2Params


class TaskDescriptionStrategyUTK2(TaskDescriptionStrategy):
    def get_description(self, training):
        params: UTK2Params = UTK2Params.from_dict(training.params)

        return f"""Выполните настройку частоты в режиме ЧМ25. 
        Создайте канал с рабочей частотой {params.target_channel.frequency} МГц 
        и названием {params.target_channel.name}. 
        Создайте и выберите для данного канал направление"""

    def get_training_kind(self):
        return TrainingType.UTK2
