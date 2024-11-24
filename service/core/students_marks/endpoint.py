from service.core.students_marks.use_case import GetStudentsMarksTableUseCase,GetStudentsMarksTableRq, GetStudentsMarksTableRs


class StudentsMarksEndpoint:
    def __init__(self,
                 get_students_marks_table_use_case: GetStudentsMarksTableUseCase):
        self._get_students_marks_table_use_case = get_students_marks_table_use_case

    def get_students_marks_table(self, request: GetStudentsMarksTableRq) -> GetStudentsMarksTableRs:
        return self._get_students_marks_table_use_case.apply(request)