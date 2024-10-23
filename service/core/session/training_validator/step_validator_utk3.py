from service.common.message_source import MessageSource
from service.common.screen_navigator import ScreenNavigator
from service.core.session.training_validator.step_validator import BaseStepValidator
from service.domain.session import Session


class UTK3Step1Validator(BaseStepValidator):
    def __init__(self,
                 navigator: ScreenNavigator,
                 message_source: MessageSource):
        super().__init__(navigator, message_source)

    def get_step_message_code(self) -> str:
        """
        Получить код сообщения для валидатора
        """
        return "UTK_3_STEP_1_CODE"

    def is_valid(self, session: Session) -> bool:
        """
        Проверить валидность тренировки в сессии
        """
        phone = session.phone
        if not phone.channels:
            return False
        for channel in phone.channels:
            if channel.name == 'КВ2' and channel.mode == 'CHM50' and channel.frequency == 50500000:
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


class UTK3Step2Validator(BaseStepValidator):
    def __init__(self,
                 navigator: ScreenNavigator,
                 message_source: MessageSource):
        super().__init__(navigator, message_source)

    def get_step_message_code(self) -> str:
        """
        Получить код сообщения для валидатора
        """
        return "UTK_3_STEP_2_CODE"

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


class UTK3Step3Validator(BaseStepValidator):
    def __init__(self,
                 navigator: ScreenNavigator,
                 message_source: MessageSource):
        super().__init__(navigator, message_source)

    def get_step_message_code(self) -> str:
        """
        Получить код сообщения для валидатора
        """
        return "UTK_3_STEP_3_CODE"

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
