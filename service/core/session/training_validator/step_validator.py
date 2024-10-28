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
    def success(order: Optional[int] = 0):
        return ValidationResult(True, None, order)

    @staticmethod
    def failure(message, order: int = 0):
        return ValidationResult(False, message, order)

    def __init__(self, success: bool, message: Optional[str], order: Optional[int] = 0):
        self.is_success = success
        self.message = message
        self.order = order


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


class BaseStepValidator(StepValidator, ABC):
    """
    Базовый валидатор шага тренировки
    """

    def __init__(self,
                 navigator: ScreenNavigator,
                 message_source: MessageSource,
                 step_message_code: str = None,
                 order: int = None,
                 target_screen_code: str = None
                 ):
        self.navigator = navigator
        self.message_source = message_source
        self.step_message_code = step_message_code
        self.order = order
        self.target_screen_code = target_screen_code

    def validate(self, screen_code: str, session: Session) -> ValidationResult:
        valid = self.is_valid(session)
        if valid:
            return ValidationResult.success(self.get_order())

        target_screen_code = self.get_target_screen_code()
        if screen_code == target_screen_code:
            message = self.get_hint_message(
                session)  # self.message_source.get_message(self.get_step_message_code(), **session.training.params)
            return ValidationResult.failure(message, self.get_order())

        movement = self.navigator.navigate(screen_code, target_screen_code)
        if isinstance(movement, ForwardMovement):
            message = self.message_source.get_message("NEXT_SCREEN_CODE", movement.next_screen_code)
        else:
            message = self.message_source.get_message("RETURN_BACK_CODE")

        return ValidationResult.failure(message, self.get_order())

    def get_step_message_code(self) -> str:
        """
        Получить код сообщения для валидатора
        """
        return self.step_message_code

    def get_hint_message(self, session: Session) -> str:
        return self.message_source.get_message(self.get_step_message_code(), )

    @abstractmethod
    def is_valid(self, session) -> bool:
        """
        Проверить валидность тренировки в сессии
        """
        pass

    def get_order(self) -> int:
        """
        Получить номер шага
        """
        return self.order

    def get_target_screen_code(self) -> str:
        """
        Получить код экрана, на к-м нужно отобразить сообщение
        """
        return self.target_screen_code


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
