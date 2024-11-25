from typing import List

from service.common.utils import from_str_datetime_to_obj
from service.core.group.repo import GroupRepo
from service.core.session import SessionRepo
from service.core.session.impl.training import TrainingResultCalculatorServiceImpl
from service.core.session.training import Mark
from service.core.students_marks.use_case import GetStudentsMarksTableUseCase, GetStudentsMarksTableRq, \
    GetStudentsMarksTableRs
from service.domain.session import SessionType, Session
from service.domain.students_marks_table import StudentsMarksTable, StudentMarks, StudentMark, Class
from service.domain.user import User


class GetStudentsMarksTableUseCaseImpl(GetStudentsMarksTableUseCase):
    def __init__(self,
                 training_result_calculator: TrainingResultCalculatorServiceImpl,
                 session_repo: SessionRepo,
                 group_repo: GroupRepo):
        self.training_result_calculator = training_result_calculator
        self.session_repo = session_repo
        self.group_repo = group_repo

    def apply(self, request: GetStudentsMarksTableRq) -> GetStudentsMarksTableRs:
        users = self.group_repo.get_users_in_group(request.group_uid)
        users_sessions = [self.session_repo.get_sessions(user.uid) for user in users]
        exam_users_sessions = [[user_session for user_session in user_sessions
                                if user_session.type == SessionType.EXAM]
                               for user_sessions in users_sessions]
        classes = self.get_classes(exam_users_sessions)
        student_marks_rows = self.get_students_rows(classes, exam_users_sessions, users)
        student_marks_rows.sort(key=lambda sm: sm.fio)
        students_marks_table = StudentsMarksTable(classes=classes,
                                                  rows=student_marks_rows)
        return GetStudentsMarksTableRs(timetable=students_marks_table)

    def get_classes(self, users_sessions: List[List[Session]]) -> List[Class]:
        classes = set()
        for user_sessions in users_sessions:
            for session in user_sessions:
                if session.type == SessionType.EXAM:
                    cls = Class(name=session.training.kind, date=session.date)
                    classes.add(cls)
        classes_sorted_by_date = sorted(classes, key=lambda c: from_str_datetime_to_obj(c.date))
        return classes_sorted_by_date

    def get_students_rows(self,
                          classes: List[Class],
                          users_sessions: List[List[Session]],
                          users: List[User]) -> List[StudentMarks]:
        students_marks = []
        for index, user in enumerate(users):
            user_sessions = users_sessions[index]
            student_marks = self.get_student_row(classes, user_sessions, user)
            students_marks.append(student_marks)
        return students_marks

    def get_student_row(self, classes: List[Class], sessions: List[Session], user: User) -> StudentMarks:
        student_marks = StudentMarks(fio=user.fio, )
        session_by_date = {session.date: session for session in sessions}
        for cls in classes:
            if cls.date in session_by_date:
                session = session_by_date[cls.date]
                mark = self.get_mark(session)
                student_mark = StudentMark(session_id=session.date, mark=mark)
            else:
                student_mark = StudentMark(session_id=None, mark=Mark.NOT_DEFINED)
            student_marks.results.append(student_mark)
        return student_marks

    def get_mark(self, session):
        try:
            training_result = self.training_result_calculator.calculate(session)
            return training_result.mark
        except Exception:
            return Mark.NOT_DEFINED
