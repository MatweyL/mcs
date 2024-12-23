from typing import List
from uuid import uuid4

from service.core.group.use_case import GetUserListByGroupUseCase, GetUserListByGroupRq
from service.core.session import CreateSessionUseCase, CreateSessionRq, SessionRq, SessionRepo
from service.core.task.description.service import TaskDescriptionService
from service.core.task.template.service import TaskTemplateService
from service.core.task.template.template_field import TemplateField
from service.core.task.use_case import IssueTaskListUseCase, IssueTaskListRq, IssueTaskListRs, GetTaskUseCase, \
    GetTaskRq, TaskRs, GetTaskTemplateUseCase, GetTaskTemplateRq, TaskTemplateRs
from service.domain.session import SessionType


class GetTaskUseCaseImpl(GetTaskUseCase):
    def __init__(self,
                 session_repo: SessionRepo,
                 task_description_service: TaskDescriptionService):
        self.session_repo = session_repo
        self.task_description_service = task_description_service

    def apply(self, request: GetTaskRq) -> TaskRs:
        session = self.session_repo.get_session(session_id=request.session_id)

        description = self.task_description_service.get_description(session.training)
        return TaskRs(description)


class IssueTaskListUseCaseImpl(IssueTaskListUseCase):
    def __init__(self,
                 create_session_use_case: CreateSessionUseCase,
                 get_user_list_by_group_use_case: GetUserListByGroupUseCase):
        self.create_session_use_case = create_session_use_case
        self.get_user_list_by_group_use_case = get_user_list_by_group_use_case

    def apply(self, request: IssueTaskListRq) -> IssueTaskListRs:
        users = self.get_users(request.group_id)
        variants = request.variants
        class_uid = str(uuid4())

        for index in range(len(users)):
            variant = variants[index % len(variants)]
            session = SessionRq(
                training=request.training,
                type=SessionType.EXAM,
                training_params=variant,
                class_uid=class_uid,
            )

            user = users[index]
            create_session_rq = CreateSessionRq(user_uid=user.uid, session=session)

            self.create_session_use_case.apply(create_session_rq)

        return IssueTaskListRs()

    def get_users(self, group_uid: str):
        request = GetUserListByGroupRq(group_uid=group_uid)
        response = self.get_user_list_by_group_use_case.apply(request)

        return response.users


class GetTaskTemplateUseCaseImpl(GetTaskTemplateUseCase):
    def __init__(self, task_template_service: TaskTemplateService):
        self.task_template_service = task_template_service

    def apply(self, request: GetTaskTemplateRq) -> TaskTemplateRs:
        template: List[TemplateField] = self.task_template_service.get_template(request.kind)

        return TaskTemplateRs(template)
