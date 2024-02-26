from service.common.logs import logger
from service.dictionary.use_case import GetDictionaryUseCase, GetDictionaryRq


class DictionaryEndpoint:

    def __init__(self, get_dictionary_use_case: GetDictionaryUseCase):
        self.get_dictionary_use_case = get_dictionary_use_case

    def get_dictionary(self, request: GetDictionaryRq):
        try:
            response = self.get_dictionary_use_case.apply(request)
        except BaseException as e:
            logger.exception(e)
        else:
            return response
