import enum
from typing import List

from pydantic import BaseModel


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
    mode: ChannelMode = ChannelMode.CHM25
    prd_forbidden: bool = False
    two_frequency: bool = False
    frequency: float = 0
    ctcss: bool = False
    name: str = ''


modes_channels_map = {
    ChannelMode.CHM25: ChannelCHM25
}


class Phone:

    def __init__(self, channels: List[Channel]):
        self._channels = channels
