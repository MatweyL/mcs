from service.common.message_source import MessageSource
from service.common.screen_navigator import ScreenNavigator
from service.core.session.training_validator.step_validator import BaseStepValidator
from service.domain.session import Session
from service.domain.training import UTK2Params, UTKStepCode


class UTK2Step1Validator(BaseStepValidator):

    def get_hint_message(self, session: Session) -> str:
        utk2_params = UTK2Params.from_dict(session.training.params)
        return self.message_source.get_message(self.get_step_message_code(),
                                               channel_name=utk2_params.target_channel.name,
                                               channel_mode=utk2_params.target_channel.mode,
                                               channel_frequency=utk2_params.target_channel.frequency / 10 ** 6)  # MHz

    def __init__(self,
                 navigator: ScreenNavigator,
                 message_source: MessageSource):
        super().__init__(navigator, message_source)

    def get_step_message_code(self) -> str:
        """
        Получить код сообщения для валидатора
        """
        return UTKStepCode.UTK_2_STEP_1_CODE

    def is_valid(self, session: Session) -> bool:
        """
        Проверить валидность тренировки в сессии
        """
        phone = session.phone
        if not phone.channels:
            return False
        utk2_params = UTK2Params.from_dict(session.training.params)
        for channel in phone.channels:
            if (channel.name == utk2_params.target_channel.name
                    and channel.mode == utk2_params.target_channel.mode
                    and channel.frequency == utk2_params.target_channel.frequency):
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

    def get_hint_message(self, session: Session) -> str:
        utk2_params = UTK2Params.from_dict(session.training.params)
        return self.message_source.get_message(self.get_step_message_code(),
                                               direction_name=utk2_params.target_direction.name, )

    def __init__(self,
                 navigator: ScreenNavigator,
                 message_source: MessageSource):
        super().__init__(navigator, message_source)

    def get_step_message_code(self) -> str:
        """
        Получить код сообщения для валидатора
        """
        return UTKStepCode.UTK_2_STEP_2_CODE

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
        return UTKStepCode.UTK_2_STEP_3_CODE

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
