from service.core.use_case import VoidResponse
from service.screen.use_case import SaveScreenUseCase, ScreenValues, GetScreenUseCase, GetScreenRq
from service.services.screens.manager_v2 import ScreensManagerV2


class SaveScreenUseCaseImpl(SaveScreenUseCase):
    def __init__(self, screens_manager: ScreensManagerV2):
        self.screens_manager = screens_manager

    def apply(self, screen_model: ScreenValues) -> VoidResponse:
        self.screens_manager.save(screen_model)
        return VoidResponse()


class GetScreenUseCaseImpl(GetScreenUseCase):
    def __init__(self, screens_manager: ScreensManagerV2):
        self.screens_manager = screens_manager

    def apply(self, request: GetScreenRq) -> VoidResponse:
        screen_name = request.screen_name
        uid = request.uid
        return self.screens_manager.get(screen_name, {"id": uid})
