from abc import abstractmethod
from dataclasses import dataclass
from typing import List

from service.core.use_case import Request, Response, UseCase


class GetDeviceListRq(Request):
    pass


@dataclass
class Label:
    label: str = None
    value: str = None
    rich_label: str = None


class DeviceListRs(Response):
    devices: List[Label]


class GetDeviceListUseCase(UseCase):
    @abstractmethod
    def apply(self, request: GetDeviceListRq) -> DeviceListRs:
        pass


class GetTrainingTypeListRq(Request):
    device: str


class TrainingTypeListRs(Response):
    def __init__(self, types: List[Label]):
        self.types = types


class GetTrainingTypeListUseCase(UseCase):
    @abstractmethod
    def apply(self, request: GetTrainingTypeListRq) -> TrainingTypeListRs:
        pass
