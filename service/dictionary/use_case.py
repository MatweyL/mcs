from abc import abstractmethod, ABC

from service.core.use_case import Request, VoidResponse


class GetDictionaryRq(Request):
    session_id: str
    dictionary_type: str


class GetDictionaryUseCase(ABC):
    @abstractmethod
    def apply(self, request: GetDictionaryRq) -> VoidResponse:
        pass
