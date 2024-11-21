from service.core.group.use_case import GetUserListByGroupUseCase, GetUserListByGroupRq
from service.core.session import CreateSessionUseCase, CreateSessionRq, SessionRq, SessionRepo
from service.core.task.description.service import TaskDescriptionService
from service.core.task.use_case import IssueTaskListUseCase, IssueTaskListRq, IssueTaskListRs, GetTaskUseCase, \
    GetTaskRq, TaskRs
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

        for index in range(len(users)):
            session = SessionRq(
                training=request.training,
                type=SessionType.EXAM,
                training_params=variants[index % len(variants)]
            )

            user = users[index]
            create_session_rq = CreateSessionRq(user_uid=user.uid, session=session)

            self.create_session_use_case.apply(create_session_rq)

        return IssueTaskListRs()

    def get_users(self, group_uid: str):
        request = GetUserListByGroupRq(group_uid=group_uid)
        response = self.get_user_list_by_group_use_case.apply(request)

        return response.users
