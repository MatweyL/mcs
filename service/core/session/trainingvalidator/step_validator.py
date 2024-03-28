from abc import abstractmethod, ABC
from typing import Optional

from service.common.message_source import MessageSource
from service.common.screen_navigator import ScreenNavigator, ForwardMovement
from service.domain.session import Session, SessionStatus


class ValidationResult:
    """
    результат валидации
    """

    @staticmethod
    def success():
        return ValidationResult(True, None)

    @staticmethod
    def failure(message):
        return ValidationResult(False, message)

    def __init__(self, success: bool, message: Optional[str]):
        self.success = success
        self.message = message


class StepValidator(ABC):
    @abstractmethod
    def validate(self, screen_code: str, session: Session) -> ValidationResult:
        """
        производит валидацию конкретного шага тренировки
        """
        pass

    @abstractmethod
    def get_order(self) -> int:
        """
        номер шага
        """
        pass


class BaseStepValidator(StepValidator):
    """
    Базовый валидатор шага тренировки
    """

    def __init__(self,
                 navigator: ScreenNavigator,
                 message_source: MessageSource):
        self.navigator = navigator
        self.message_source = message_source

    def validate(self, screen_code: str, session: Session) -> ValidationResult:
        valid = self.is_valid(session)
        if valid:
            return ValidationResult.success()

        target_screen_code = self.get_target_screen_code()
        if screen_code == target_screen_code:
            message = self.message_source.get_message(self.get_step_message_code())
            return ValidationResult.failure(message)

        movement = self.navigator.navigate(screen_code, target_screen_code)
        if isinstance(movement, ForwardMovement):
            message = self.message_source.get_message("NEXT_SCREEN_CODE", movement.next_screen_code)
        else:
            message = self.message_source.get_message("RETURN_BACK_CODE")

        return ValidationResult.failure(message)

    def get_step_message_code(self) -> str:
        """
        Получить код сообщения для валидатора
        """
        pass

    def is_valid(self, session) -> bool:
        """
        Проверить валидность тренировки в сессии
        """
        pass

    def get_order(self) -> int:
        """
        Получить номер шага
        """
        pass

    def get_target_screen_code(self) -> str:
        """
        Получить код экрана, на к-м нужно отобразить сообщение
        """
        pass


class ExampleStepValidator(BaseStepValidator):
    """
    Пример реализации валидатора
    """

    def __init__(self,
                 navigator: ScreenNavigator,
                 message_source: MessageSource):
        super().__init__(navigator, message_source)

    def get_step_message_code(self):
        return "EXAMPLE_STEP_CODE"

    def is_valid(self, session):
        return session.status == SessionStatus.IN_WORK

    def get_order(self):
        return 1

    def get_target_screen_code(self):
        return "CHANNEL_EDITOR"


class UTK2Step1Validator(BaseStepValidator):
    pass


class UTK2Step2Validator(BaseStepValidator):
    pass
