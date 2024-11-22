from dataclasses import dataclass, field
from typing import List


@dataclass
class Class:
    name: str
    date: str

    def __hash__(self):
        return hash(f"{self.name} {self.date}")

    def __eq__(self, other):
        return isinstance(other, Class) and self.name == other.name and self.date == other.date


@dataclass
class StudentMark:
    session_id: str
    mark: str


@dataclass
class StudentMarks:
    fio: str
    results: List[StudentMark] = field(default_factory=list)


@dataclass
class StudentsMarksTable:
    classes: List[Class] = field(default_factory=list)
    rows: List[StudentMarks] = field(default_factory=list)
