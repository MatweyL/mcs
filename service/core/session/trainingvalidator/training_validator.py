from typing import List

from service.core.session.trainingvalidator.step_validator import StepValidator, ValidationResult
from service.domain.session import Session


class TrainingValidator:
    """
    Валидатор тренировки
    """
    def __init__(self,
                 step_validator: List[StepValidator],
                 training: str):
        """
        :param step_validator: валидаторы отдельных шагов тренировки
        :param training: название тренировки (например, UTK1)
        """
        pass

    def validate(self, screen_name: str, session: Session) -> ValidationResult:
        """
        возвращает результат валидации тренировки
        """
        pass
