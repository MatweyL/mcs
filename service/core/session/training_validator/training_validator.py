from typing import List

from service.core.session.training_validator.step_validator import StepValidator, ValidationResult
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
        self.step_validator = step_validator
        self.training = training

    def validate(self, screen_code: str, session: Session) -> ValidationResult:
        """
        возвращает результат валидации тренировки
        """
        pass


class TrainingValidatorImpl(TrainingValidator):
    def validate(self, screen_code: str, session: Session) -> ValidationResult:
        """
        возвращает результат валидации тренировки
        """
        validation_result = None
        for step_validator in self.step_validator:
            validation_result = step_validator.validate(screen_code, session)
            if not validation_result.is_success:
                return validation_result
        return validation_result
