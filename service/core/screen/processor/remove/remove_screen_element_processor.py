from abc import abstractmethod

from service.domain.session import Session


class RemoveScreenElementProcessor:
    @abstractmethod
    def process(self, session: Session, element_id: str, ):
        pass

    @abstractmethod
    def get_screen_name(self) -> str:
        pass
