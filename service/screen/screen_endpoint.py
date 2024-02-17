from service.common.logs import logger
from service.screen.use_case import SaveScreenUseCase, GetScreenUseCase, GetScreenRq, SaveScreenRq


class ScreenEndpoint:
    def __init__(self,
                 save_screen_use_case: SaveScreenUseCase,
                 get_screen_use_case: GetScreenUseCase):
        self.save_screen_use_case = save_screen_use_case
        self.get_screen_use_case = get_screen_use_case

    def save_screen(self, request: SaveScreenRq):
        try:
            self.save_screen_use_case.apply(request)
        except BaseException as e:
            logger.exception(e)
            raise e
        else:
            return 201

    def get_screen(self, request: GetScreenRq):
        try:
            return self.get_screen_use_case.apply(request)
        except BaseException as e:
            logger.exception(e)
