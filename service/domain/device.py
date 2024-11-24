import enum
from dataclasses import dataclass, field
from typing import List, Optional

from service.domain.training import TrainingType


@dataclass
class DeviceValue:
    label: str = None
    value: str = None
    kinds: List[TrainingType] = field(default_factory=list)


class DeviceValues(enum.Enum):
    AZART_R187 = ("Азарт Р-187", "AZART_R187", [
        TrainingType.UTK2,
        TrainingType.UTK3,
        TrainingType.UTK4
    ])

    def __init__(self, label, value, kinds):
        self._label_ = label
        self._name_ = value
        self._kinds_ = kinds

    @property
    def label(self):
        return self._label_

    @property
    def kinds(self):
        return self._kinds_

    @property
    def name(self):
        return self._name_

    @staticmethod
    def from_name(name: str) -> Optional[DeviceValue]:
        for device_value in DeviceValues:
            if device_value.name == name:
                return device_value
        return None
