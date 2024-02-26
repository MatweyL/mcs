from abc import abstractmethod

from service.core.use_case import Request, VoidResponse


class GetDictionaryRq(Request):
    session_id: str
    dictionary_type: str


class GetDictionaryUseCase:
    @abstractmethod
    def apply(self, request: GetDictionaryRq) -> VoidResponse:
        pass
