import enum
from dataclasses import dataclass
from typing import Union

from service.domain.channel import Channel, ChannelMode

FREQUENCY = 'frequency'
CHANNEL_NAME = 'channel_name'
CHANNEL_MODE = 'channel_mode'

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
    UTK_2_STEP_4_CODE = "UTK_2_STEP_4_CODE"

    UTK_3_STEP_1_CODE = "UTK_3_STEP_1_CODE"
    UTK_3_STEP_2_CODE = "UTK_3_STEP_2_CODE"
    UTK_3_STEP_3_CODE = "UTK_3_STEP_3_CODE"
    UTK_3_STEP_4_CODE = "UTK_3_STEP_4_CODE"


@dataclass
class Training:
    kind: TrainingType = None
    params: dict[str, Union[float, int, str, dict]] = None


@dataclass
class UTK2Params:
    target_channel: Channel
    # target_direction: Direction

    @staticmethod
    def from_dict(params: dict) -> 'UTK2Params':
        target_channel = Channel(
            mode=ChannelMode.from_name(params[CHANNEL_MODE]),
            name=params[CHANNEL_NAME],
            frequency=params[FREQUENCY]
        )
        # target_direction = Direction(**params['target_direction'])
        return UTK2Params(target_channel=target_channel)


@dataclass
class UTK3Params:
    target_channel: Channel
    # target_direction: Direction

    @staticmethod
    def from_dict(params: dict) -> 'UTK3Params':
        target_channel = Channel(
            mode=ChannelMode.from_name(params[CHANNEL_MODE]),
            name=params[CHANNEL_NAME],
            frequency=params[FREQUENCY]
        )
        # target_direction = Direction(**params['target_direction'])
        return UTK3Params(target_channel)


class UTK4Params:
    pass