from typing import TypeVar, Type

T = TypeVar("T")


class Mapper:
    def map(self, first, type_second: Type[T]) -> T:
        if type_second is dict:
            instance = {}
            self._map_to_dict(first, instance)
            return instance

        instance = type_second()
        if isinstance(first, dict):
            self._map_from_dict(first, instance)
            return instance

        self._map_class(first, instance)
        return instance

    def _map_to_dict(self, object, instance: dict):
        fields = vars(object)
        for name in fields:
            value = getattr(object, name)
            instance[name] = value

    def _map_from_dict(self, dict_attributes: dict, instance):
        fields = vars(instance)
        print(fields)
        for name in fields:
            value = dict_attributes.get(name, None)
            if value:
                setattr(instance, name, value)

    def _map_class(self, object, instance):
        fields = vars(object)
        for name in fields:
            value = getattr(object, name)
            setattr(instance, name, value)
