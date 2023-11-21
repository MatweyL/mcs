from abc import abstractmethod
from typing import Dict, Any


class AbstractFacade:

    @abstractmethod
    def save(self, attributes: Dict[str, Any]):
        pass
