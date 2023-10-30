import enum
from typing import List

from pydantic import BaseModel, Field, AliasChoices


class ChannelMode(str, enum.Enum):
    NOT_DEFINED = "NOT_DEFINED"
    TETRA_DMO = "TETRA_DMO"  # TETRA_DMO - value; TETRA DMO - name (FOR SELECT BUTTON)
    TETRA_TMO = "TETRA_TMO"
    VPD = "VPD"
    AM25 = "AM25"
    CHM25 = "CHM25"
    CHM50 = "CHM50"
    OBP = "OBP"
    FM_RADIO = "FM_RADIO"


class Channel(BaseModel):
    mode: ChannelMode


class ChannelCHM25(Channel):
    mode: ChannelMode = Field(default=ChannelMode.CHM25)
    prd_forbidden: bool = Field(default=False,
                                validation_alias=AliasChoices('prd_forbidden', 'prdForbidden', 'PRD_FORBIDDEN'))
    double_frequency: bool = Field(default=False,
                                   validation_alias=AliasChoices('double_frequency', 'doubleFrequency',
                                                                 'DOUBLE_FREQUENCY'))
    frequency: float = 0
    ctcss: bool = False
    name: str = ''


modes_channels_map = {
    ChannelMode.CHM25: ChannelCHM25
}


class Phone:

    def __init__(self, channels: List[Channel]):
        self._channels = channels
