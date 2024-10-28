import enum
from dataclasses import dataclass, field
from typing import Union

from service.domain.channel import Channel
from service.domain.direction import Direction


class TrainingType(str, enum.Enum):
    UTK1 = "УТК-1"
    UTK2 = "УТК-2"
    UTK3 = "УТК-3"
    UTK4 = "УТК-4"


class UTKStepCode(str, enum.Enum):
    UTK_2_STEP_1_CODE = "UTK_2_STEP_1_CODE"
    UTK_2_STEP_2_CODE = "UTK_2_STEP_2_CODE"
    UTK_2_STEP_3_CODE = "UTK_2_STEP_3_CODE"
    UTK_3_STEP_1_CODE = "UTK_3_STEP_1_CODE"
    UTK_3_STEP_2_CODE = "UTK_3_STEP_2_CODE"
    UTK_3_STEP_3_CODE = "UTK_3_STEP_3_CODE"

@dataclass
class Training:
    kind: str = None
    params: dict[str, Union[float, int, str, dict]] = field(default_factory=dict)


@dataclass
class UTK2Params:
    target_channel: Channel
    target_direction: Direction

    @staticmethod
    def from_dict(params: dict) -> 'UTK2Params':
        target_channel = Channel(**params['channel'])
        target_direction = Direction(**params['direction'])
        if not target_channel.mode:
            target_channel.mode = 'CHM25'
        return UTK2Params(target_channel=target_channel,
                          target_direction=target_direction, )


@dataclass
class UTK3Params:
    target_channel: Channel
    target_direction: Direction

    @staticmethod
    def from_dict(params: dict) -> 'UTK3Params':
        target_channel = Channel(**params['channel'])
        target_direction = Direction(**params['direction'])
        if not target_channel.mode:
            target_channel.mode = 'CHM50'
        return UTK3Params(target_channel,
                          target_direction=target_direction, )
