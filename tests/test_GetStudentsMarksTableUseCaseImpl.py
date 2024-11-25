import pprint

from service.core.students_marks.use_case import GetStudentsMarksTableRq


def test_apply(get_students_marks_table_use_case):
    # WHEN
    table = get_students_marks_table_use_case.apply(GetStudentsMarksTableRq(group_uid='123'))

    # THEN
    assert table
    pprint.pprint(table.model_dump())
