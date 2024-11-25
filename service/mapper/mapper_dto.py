from abc import abstractmethod
from typing import TypeVar

from service.core.session import SessionDto
from service.domain.constants.training_names import TRAINING_NAMES
from service.domain.session import Session, SessionType

D = TypeVar('D')
E = TypeVar('E', bound=dict)


class Mapper:
    @abstractmethod
    def map_to_dto(self, domain: E) -> D:
        pass


class SessionDtoMapper(Mapper):
    def __init__(self):
        self.conversions = TRAINING_NAMES

    def map_to_dto(self, domain: Session) -> SessionDto:
        dto = SessionDto()

        dto.uid = domain.uid
        if domain.type == SessionType.FREE:
            dto.title = 'Свободная тренировка'
        else:
            dto.title = self.conversions.get(domain.training.kind, "Не определено")
        dto.date = domain.date
        dto.phone = domain.phone
        dto.user_uid = domain.user_uid
        dto.status = domain.status
        dto.attempts = domain.attempts
        dto.training = domain.training
        dto.type = domain.type

        return dto
