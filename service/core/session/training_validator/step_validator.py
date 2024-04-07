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
            return ValidationResult.success(self.get_order())

        target_screen_code = self.get_target_screen_code()
        if screen_code == target_screen_code:
            message = self.message_source.get_message(self.get_step_message_code())
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
    def __init__(self,
                 navigator: ScreenNavigator,
                 message_source: MessageSource):
        super().__init__(navigator, message_source)

    def get_step_message_code(self) -> str:
        """
        Получить код сообщения для валидатора
        """
        return "UTK_2_STEP_1_CODE"

    def is_valid(self, session: Session) -> bool:
        """
        Проверить валидность тренировки в сессии
        """
        phone = session.phone
        if not phone.channels:
            return False
        for channel in phone.channels:
            if channel.name == 'КР1' and channel.mode == 'CHM25' and channel.frequency == '45775000':
                return True
        return False

    def get_order(self) -> int:
        """
        Получить номер шага
        """
        return 1

    def get_target_screen_code(self) -> str:
        """
        Получить код экрана, на к-м нужно отобразить сообщение
        """
        return "CHANNEL_EDITOR"


class UTK2Step2Validator(BaseStepValidator):
    def __init__(self,
                 navigator: ScreenNavigator,
                 message_source: MessageSource):
        super().__init__(navigator, message_source)

    def get_step_message_code(self) -> str:
        """
        Получить код сообщения для валидатора
        """
        return "UTK_2_STEP_2_CODE"

    def is_valid(self, session: Session) -> bool:
        """
        Проверить валидность тренировки в сессии
        """
        phone = session.phone
        if not phone.directions:
            return False

        for direction in phone.directions:
            for channel in phone.channels:
                if direction.channel == channel.uid:
                    return True
        return False

    def get_order(self) -> int:
        """
        Получить номер шага
        """
        return 2

    def get_target_screen_code(self) -> str:
        """
        Получить код экрана, на к-м нужно отобразить сообщение
        """
        return "DIRECTION_EDITOR"


class UTK2Step3Validator(BaseStepValidator):
    def __init__(self,
                 navigator: ScreenNavigator,
                 message_source: MessageSource):
        super().__init__(navigator, message_source)

    def get_step_message_code(self) -> str:
        """
        Получить код сообщения для валидатора
        """
        return "UTK_2_STEP_3_CODE"

    def is_valid(self, session: Session) -> bool:
        """
        Проверить валидность тренировки в сессии
        """
        return False

    def get_order(self) -> int:
        """
        Получить номер шага
        """
        return 3

    def get_target_screen_code(self) -> str:
        """
        Получить код экрана, на к-м нужно отобразить сообщение
        """
        return "MAIN_SCREEN"
