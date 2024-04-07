import json
from typing import TypeVar, Type

from service.common.json_utils import handler

T = TypeVar("T")

primitives = (bool, str, int, float, type(None))

def is_primitive(obj):
    return isinstance(obj, primitives)

class Mapper:
    def map(self, first, type_second: Type[T]) -> T:
        if type_second is dict:
            return self._map_to_dict(first)

        instance = type_second()
        if isinstance(first, dict):
            self._map_from_dict(first, instance)
            return instance

        self._map_class(first, instance)
        return instance

    def _map_to_dict(self, object):
        return json.loads(json.dumps(object, ensure_ascii=False, indent=2, default=handler))
        # fields = vars(object)
        # for name in fields:
        #     value = getattr(object, name)
        #     if is_primitive(value):
        #         instance[name] = value
        #     else:
        #         instance[name] = self.map(value, dict)

    def _map_from_dict(self, dict_attributes: dict, instance):
        fields = vars(instance)
        for name in fields:
            value = dict_attributes.get(name, None)
            if value:
                setattr(instance, name, value)

    def _map_class(self, object, instance):
        fields = vars(object)
        for name in fields:
            value = getattr(object, name)
            setattr(instance, name, value)
