from service.core.task.use_case import IssueTaskListUseCase, IssueTaskListRq, IssueTaskListRs, GetTaskRq, TaskRs, \
    GetTaskUseCase


class TaskEndpoint:
    def __init__(self,
                 issue_task_list_use_case: IssueTaskListUseCase,
                 get_task_use_case: GetTaskUseCase):
        self.issue_task_list_use_case = issue_task_list_use_case
        self.get_task_use_case = get_task_use_case

    def issue_tasks(self, request: IssueTaskListRq) -> IssueTaskListRs:
        return self.issue_task_list_use_case.apply(request=request)

    def get_task_description(self, request: GetTaskRq) -> TaskRs:
        return self.get_task_use_case.apply(request)
