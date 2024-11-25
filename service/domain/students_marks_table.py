from dataclasses import dataclass, field
from typing import List


@dataclass
class Class:
    name: str
    date: str
    class_uid: str

    def __hash__(self):
        return hash(f"{self.class_uid}")

    def __eq__(self, other):
        return (isinstance(other, Class)
                and self.class_uid == other.class_uid)


@dataclass
class StudentMark:
    session_id: str
    mark: str
    class_uid: str = None


@dataclass
class StudentMarks:
    fio: str
    results: List[StudentMark] = field(default_factory=list)


@dataclass
class StudentsMarksTable:
    classes: List[Class] = field(default_factory=list)
    rows: List[StudentMarks] = field(default_factory=list)
