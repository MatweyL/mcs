from service.core.device.use_case import GetDeviceListUseCase, GetDeviceListRq, DeviceListRs, \
    GetTrainingTypeListUseCase, GetTrainingTypeListRq, TrainingTypeListRs, Label
from service.domain.constants.training_names import TRAINING_NAMES
from service.domain.device import DeviceValues, DeviceValue


class GetDeviceListUseCaseImpl(GetDeviceListUseCase):
    def apply(self, request: GetDeviceListRq) -> DeviceListRs:
        devices = []
        for device in DeviceValues:
            devices.append(Label(device.label, device.name))

        response = DeviceListRs()
        response.devices = devices

        return response


class GetTrainingTypeListUseCaseImpl(GetTrainingTypeListUseCase):
    def apply(self, request: GetTrainingTypeListRq) -> TrainingTypeListRs:
        device_value: DeviceValue = DeviceValues.from_name(request.device)
        if device_value is None:
            return TrainingTypeListRs([])

        types = []
        for training_type in device_value.kinds:
            types.append(Label(training_type.value, training_type.name, TRAINING_NAMES[training_type]))

        return TrainingTypeListRs(types)
