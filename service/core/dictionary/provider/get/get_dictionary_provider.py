import json
import os
from abc import ABC, abstractmethod

from pathlib import Path

from service.common.logs import logger
from service.domain.session import Session


class DictionaryProviderInterface(ABC):
    @abstractmethod
    def provide(self,
                session: Session,
                dictionary_type: str):
        pass

    @abstractmethod
    def get_dictionary_type(self) -> str:
        pass


class DefaultDictionaryProvider(DictionaryProviderInterface):

    def __init__(self, path_to_dictionaries: str):
        self._path_to_dictionaries: str = path_to_dictionaries
        if not os.path.exists(self._path_to_dictionaries):
            raise FileNotFoundError(f'not found: {self._path_to_dictionaries}')

    def provide(self, session: Session, dictionary_type: str) -> dict:
        dictionary_type = dictionary_type.upper()
        path_to_dictionary = os.path.join(self._path_to_dictionaries, dictionary_type, 'dictionary.json')
        try:
            dictionary = json.loads(Path(path_to_dictionary).read_text('utf-8'))
        except FileNotFoundError as e:
            logger.exception(f'not found {path_to_dictionary}: {e}')
            return {}
        else:
            return dictionary

    def get_dictionary_type(self) -> str:
        raise NotImplementedError
