from abc import abstractmethod
from typing import List, Dict

from service.core.use_case import Response, UseCase, Request


class GetTaskRq(Request):
    session_id: str


class TaskRs(Response):
    def __init__(self, description: str):
        self.description = description


class GetTaskUseCase(UseCase):
    @abstractmethod
    def apply(self, request: GetTaskRq) -> TaskRs:
        pass


class IssueTaskListRq(Request):
    group_id: str
    training: str
    variants: List[Dict[str, str]]


class IssueTaskListRs(Response):
    pass


class IssueTaskListUseCase(UseCase):
    @abstractmethod
    def apply(self, request: IssueTaskListRq) -> IssueTaskListRs:
        pass
