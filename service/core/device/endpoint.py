from service.core.device.use_case import GetDeviceListRq, DeviceListRs, GetTrainingTypeListRq, TrainingTypeListRs, \
    GetDeviceListUseCase, GetTrainingTypeListUseCase


class DeviceEndpoint:
    def __init__(self,
                 get_device_list_use_case: GetDeviceListUseCase,
                 get_training_type_list_use_case: GetTrainingTypeListUseCase):
        self.get_device_list_use_case = get_device_list_use_case
        self.get_training_type_list_use_case = get_training_type_list_use_case

    def get_devices(self, request: GetDeviceListRq) -> DeviceListRs:
        return self.get_device_list_use_case.apply(request)

    def get_trainings(self, request: GetTrainingTypeListRq) -> TrainingTypeListRs:
        return self.get_training_type_list_use_case.apply(request)
