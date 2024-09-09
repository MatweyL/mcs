from service.common.logs import logger
from service.core.screen import ScreenRepo
from service.core.screen.processor.get.get_screen_processor_registry import GetScreenProcessorRegistry
from service.core.screen.processor.save.save_screen_processor_registry import SaveScreenProcessorRegistry
from service.core.screen.use_case import SaveScreenUseCase, GetScreenUseCase, GetScreenRq, SaveScreenRq
from service.core.session.repo import SessionRepo
from service.core.use_case import VoidResponse


class SaveScreenUseCaseImpl(SaveScreenUseCase):
    def __init__(self,
                 session_repo: SessionRepo,
                 registry: SaveScreenProcessorRegistry):
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
    def __init__(self,
                 session_repo: SessionRepo,
                 registry: GetScreenProcessorRegistry,
                 screen_repo: ScreenRepo):
        self.session_repo = session_repo
        self.registry = registry
        self.screen_repo = screen_repo

    def apply(self, request: GetScreenRq):
        logger.info(f'GET SCREEN USE CASE {request}')

        screen_name = request.screen_name
        screen_template = self.screen_repo.get(screen_name)

        session = self.session_repo.get_session(request.session_id)
        processor = self.registry.get_processor(screen_name)

        processor.process(session, screen_template, request.uid)
        screen_template['status'] = session.status

        return screen_template
