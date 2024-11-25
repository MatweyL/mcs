from abc import abstractmethod
from typing import Optional, Dict, Any, List

from service.core.session.impl.use_case import TrainingFactory
from service.domain.channel import ChannelMode
from service.domain.training import TrainingType, Training, CHANNEL_MODE, CHANNEL_NAME, FREQUENCY


class TrainingFactoryStrategy:
    @abstractmethod
    def create(self, variant: Optional[Dict[str, Any]]):
        pass

    @abstractmethod
    def get_training_kind(self) -> TrainingType:
        pass


class TrainingFactoryImpl(TrainingFactory):
    def __init__(self, strategies: List[TrainingFactoryStrategy]):
        self.strategies = strategies

    def create(self, training_kind: TrainingType, variant: Optional[Dict[str, Any]]) -> Training:
        for strategy in self.strategies:
            if strategy.get_training_kind() == training_kind:
                return strategy.create(variant)


DEFAULT_CHANNEL_NAME = "КР1"
DEFAULT_FREQUENCY = 45_500_000


class UTK1TrainingFactoryStrategy(TrainingFactoryStrategy):
    def create(self, variant: Optional[Dict[str, Any]]):
        return Training(TrainingType.UTK1, {})

    def get_training_kind(self) -> TrainingType:
        return TrainingType.UTK1


class UTK2TrainingFactoryStrategy(TrainingFactoryStrategy):
    def create(self, variant: Optional[Dict[str, Any]]):
        if variant is None:
            params = {CHANNEL_NAME: DEFAULT_CHANNEL_NAME,
                      CHANNEL_MODE: ChannelMode.CHM25.name,
                      FREQUENCY: DEFAULT_FREQUENCY}
        else:
            params = {CHANNEL_NAME: variant[CHANNEL_NAME],
                      CHANNEL_MODE: ChannelMode.CHM25.name,
                      FREQUENCY: int(float(variant[FREQUENCY]) * 10**6)}

        return Training(TrainingType.UTK2, params)

    def get_training_kind(self) -> TrainingType:
        return TrainingType.UTK2


class UTK3TrainingFactoryStrategy(TrainingFactoryStrategy):
    def create(self, variant: Optional[Dict[str, Any]]):
        if variant is None:
            params = {CHANNEL_NAME: DEFAULT_CHANNEL_NAME,
                      CHANNEL_MODE: ChannelMode.CHM50.name,
                      FREQUENCY: DEFAULT_FREQUENCY}
        else:
            params = {CHANNEL_NAME: variant[CHANNEL_NAME],
                      CHANNEL_MODE: ChannelMode.CHM50.name,
                      FREQUENCY: int(float(variant[FREQUENCY]) * 10**6)}

        return Training(TrainingType.UTK3, params)

    def get_training_kind(self) -> TrainingType:
        return TrainingType.UTK3
