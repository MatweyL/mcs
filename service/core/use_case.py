from abc import abstractmethod

from pydantic import BaseModel


class Request(BaseModel):
    pass


class Response:
    pass


class VoidResponse(Response):
    pass


class UseCase:
    @abstractmethod
    def apply(self, request: Request) -> Response:
        pass
