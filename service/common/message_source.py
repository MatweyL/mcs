class MessageSource:
    """
    Источник сообщений. Хранит коды сообщений и их значения
    >>> {"UTK_1_STEP_1_CODE": 'Создайте канал с режимом ЧМ25', "NEXT_SCREEN_CODE": "Перейдите на экран '%s'"}
    """

    def get_message(self, message_code, *args) -> str:
        """
        возвращает сообщение по коду сообщения

        >>> get_message("UTK_1_STEP_1_CODE")
        'Создайте канал с режимом ЧМ25'

        >>> get_message("NEXT_SCREEN_CODE", "Редактор данных")
        'Перейдите на экран "Редактор данных"'
        """
        pass
