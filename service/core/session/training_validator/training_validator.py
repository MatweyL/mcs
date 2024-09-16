from abc import ABC, abstractmethod
from typing import List

from service.core.session.training_validator.step_validator import StepValidator, ValidationResult
from service.domain.session import Session


class TrainingValidator(ABC):

    @abstractmethod
    def validate(self, screen_code: str, session: Session) -> ValidationResult:
        """
        возвращает результат валидации тренировки
        """
        pass


class AbstractTrainingValidator(TrainingValidator, ABC):
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

    def get_name(self) -> str:
        return self.training



class TrainingValidatorImpl(AbstractTrainingValidator):

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


class TrainingValidatorRegistry(TrainingValidator):
    """
        по переданному коду тренировки берет нужный TrainingValidator и вызывает у него метод validate
    """

    def __init__(self, training_validators: List[AbstractTrainingValidator]):
        self.training_validators = training_validators

    def validate(self, screen_code: str, session: Session) -> ValidationResult:
        for training_validator in self.training_validators:
            if training_validator.training == session.training:
                return training_validator.validate(screen_code, session)
        return ValidationResult.failure("Не проверено")
