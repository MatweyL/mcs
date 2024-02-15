from typing import TypeVar

T = TypeVar("T")


class Mapper:
    def map(self, first, type_second: T) -> T:
        instance = type_second()
        fields = vars(first)
        for name in fields:
            value = getattr(first, name)
            setattr(instance, name, value)

        return instance
