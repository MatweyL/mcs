from service.common.logs import logger
from service.core.use_case import VoidResponse
from service.screen.processor.get.get_screen_processor_registry import GetScreenProcessorRegistry
from service.screen.processor.save.save_screen_processor_registry import SaveScreenProcessorRegistry
from service.screen.use_case import SaveScreenUseCase, GetScreenUseCase, GetScreenRq, SaveScreenRq
from service.services.base import ScreensStorageInterface
from service.services.screens.manager_v2 import ScreensManagerV2
from service.session.repo import SessionRepo


class SaveScreenUseCaseImpl(SaveScreenUseCase):
    def __init__(self,
                 screens_manager: ScreensManagerV2,
                 session_repo: SessionRepo,
                 registry: SaveScreenProcessorRegistry):
        self.screens_manager = screens_manager
        self.session_repo = session_repo
        self.registry = registry

    def apply(self, request: SaveScreenRq) -> VoidResponse:
        logger.info('SAVE SCREEN USE CASE')
        session_id = request.session_id
        session = self.session_repo.get_session(session_id)

        screen_name = request.screen.name
        processor = self.registry.get_processor(screen_name)

        screen_attributes = request.screen.attributes
        processor.process(session, screen_attributes)

        self.session_repo.save_session(session)
        return VoidResponse()


class GetScreenUseCaseImpl(GetScreenUseCase):
    def __init__(self, screens_manager: ScreensManagerV2):
        self.screens_manager = screens_manager

    def apply(self, request: GetScreenRq) -> VoidResponse:
        screen_name = request.screen_name
        uid = request.uid
        return self.screens_manager.get(screen_name, {"id": uid})

class GetScreenUseCaseImplV2(GetScreenUseCase):
    def __init__(self,
                 session_repo: SessionRepo,
                 registry: GetScreenProcessorRegistry,
                 screen_storage: ScreensStorageInterface):
        self.session_repo = session_repo
        self.registry = registry
        self.screen_storage = screen_storage

    def apply(self, request: GetScreenRq):
        logger.info('GET SCREEN USE CASE')

        screen_name = request.screen_name
        screen_template = self.screen_storage.get(screen_name)

        session = self.session_repo.get_session(request.session_id)
        processor = self.registry.get_processor(screen_name)

        return processor.process(session, screen_template, request.uid)
