import enum
from typing import List

from pydantic import BaseModel, Field, AliasChoices


class ChannelMode(str, enum.Enum):
    NOT_DEFINED = "Не задано"
    TETRA_DMO = "TETRA DMO"
    TETRA_TMO = "TETRA DMO"
    VPD = "ВПД"
    AM25 = "АМ25"
    CHM25 = "ЧМ25"
    CHM50 = "ЧМ50"
    OBP = "ОБП"
    FM_RADIO = "FM радио"


class Channel(BaseModel):
    mode: ChannelMode


class ChannelCHM25(Channel):
    mode: ChannelMode = Field(default=ChannelMode.CHM25)
    prd_forbidden: bool = Field(default=False,
                                validation_alias=AliasChoices('prd_forbidden', 'prdForbidden'),
                                serialization_alias='prdForbidden')
    two_frequency: bool = Field(default=False,
                                validation_alias=AliasChoices('two_frequency', 'twoFrequency'),
                                serialization_alias='twoFrequency')
    frequency: float = 0
    ctcss: bool = False
    name: str = ''


modes_channels_map = {
    ChannelMode.CHM25: ChannelCHM25
}


class Phone:

    def __init__(self, channels: List[Channel]):
        self._channels = channels
