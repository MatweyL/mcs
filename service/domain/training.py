import enum
from dataclasses import dataclass, asdict
from typing import Union
from uuid import uuid4

from service.domain.channel import Channel, ChannelMode
from service.domain.direction import Direction


class TrainingType(str, enum.Enum):
    UTK1 = "УТК-1"
    UTK2 = "УТК-2"
    UTK3 = "УТК-3"
    UTK4 = "УТК-4"

    @staticmethod
    def from_name(name: str) -> 'TrainingType':
        for training_type in TrainingType:
            if training_type.name == name:
                return training_type


class UTKStepCode(str, enum.Enum):
    UTK_2_STEP_1_CODE = "UTK_2_STEP_1_CODE"
    UTK_2_STEP_2_CODE = "UTK_2_STEP_2_CODE"
    UTK_2_STEP_3_CODE = "UTK_2_STEP_3_CODE"
    UTK_3_STEP_1_CODE = "UTK_3_STEP_1_CODE"
    UTK_3_STEP_2_CODE = "UTK_3_STEP_2_CODE"
    UTK_3_STEP_3_CODE = "UTK_3_STEP_3_CODE"


@dataclass
class Training:
    kind: TrainingType = None
    params: dict[str, Union[float, int, str, dict]] = None

    def __post_init__(self):
        if not self.params:
            target_channel = Channel(uid=str(uuid4()), name='КР1', frequency=45_500_000)
            target_direction = Direction(uid=str(uuid4()), channel=target_channel.uid)
            if self.kind == 'UTK1':
                utk_params = {}
            elif self.kind == 'UTK2':
                target_channel.mode = ChannelMode.CHM25
                utk_params = UTK2Params(target_channel=target_channel,
                                        target_direction=target_direction)
            elif self.kind == 'UTK3':
                target_channel.mode = ChannelMode.CHM50
                utk_params = UTK3Params(target_channel=target_channel,
                                        target_direction=target_direction)
            else:
                raise ValueError(f"Неизвестный УТК: {self.kind}")
            self.params = asdict(utk_params)


@dataclass
class UTK2Params:
    target_channel: Channel
    target_direction: Direction

    @staticmethod
    def from_dict(params: dict) -> 'UTK2Params':
        target_channel = Channel(**params['target_channel'])
        target_direction = Direction(**params['target_direction'])
        return UTK2Params(target_channel=target_channel,
                          target_direction=target_direction, )


@dataclass
class UTK3Params:
    target_channel: Channel
    target_direction: Direction

    @staticmethod
    def from_dict(params: dict) -> 'UTK3Params':
        target_channel = Channel(**params['target_channel'])
        target_direction = Direction(**params['target_direction'])
        return UTK3Params(target_channel,
                          target_direction=target_direction, )
