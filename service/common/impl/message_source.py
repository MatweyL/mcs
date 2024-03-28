from service.common.message_source import MessageSource


class MessageSourceImpl(MessageSource):

    def __init__(self, message_by_code: dict):
        self._message_by_code = message_by_code

    def get_message(self, message_code, *args) -> str:
        return self._message_by_code.get(message_code)
