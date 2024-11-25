from abc import abstractmethod
from typing import List

from service.core.task.template.template_field import TemplateField
from service.domain.training import TrainingType, CHANNEL_NAME, FREQUENCY


class TaskTemplateService:
    @abstractmethod
    def get_template(self, kind: str) -> List[TemplateField]:
        pass

TEMPLATES = {
    TrainingType.UTK2.name: [
        TemplateField(label='Частота, МГц', name=FREQUENCY),
        TemplateField(label='Название канала', name=CHANNEL_NAME)
    ],
    TrainingType.UTK3.name: [
        TemplateField(label='Частота, МГц', name=FREQUENCY),
        TemplateField(label='Название канала', name=CHANNEL_NAME)
    ],
    TrainingType.UTK4.name: [
        TemplateField(label='Частота, МГц', name=FREQUENCY),
        TemplateField(label='Название канала', name=CHANNEL_NAME)
    ]
}


class TaskTemplateServiceImpl(TaskTemplateService):

    def get_template(self, kind: str) -> List[TemplateField]:
        return TEMPLATES.get(kind, [])
