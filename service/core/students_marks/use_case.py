from abc import abstractmethod

from pydantic import BaseModel

from service.core.use_case import UseCase, Request, Response
from service.domain.students_marks_table import StudentsMarksTable


class GetStudentsMarksTableRq(Request):
    group_uid: str


class GetStudentsMarksTableRs(BaseModel):
    timetable: StudentsMarksTable


class GetStudentsMarksTableUseCase(UseCase):
    @abstractmethod
    def apply(self, request: GetStudentsMarksTableRq) -> GetStudentsMarksTableRs:
        pass
