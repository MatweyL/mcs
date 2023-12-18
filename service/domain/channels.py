import enum
from typing import Any

from pydantic import BaseModel, Field, AliasChoices

from service.domain.base import update_attribute, get_attribute


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
    channel_uid: str
    channel_mode: ChannelMode

    def update_attribute(self, name: str, value: Any):
        update_attribute(self, name, value)

    def get_attribute(self, name: str):
        return get_attribute(self, name)


class ChannelCHM25(Channel):
    channel_mode: ChannelMode = Field(default=ChannelMode.CHM25,
                                      validation_alias=AliasChoices('channel_mode',))
    forbidden_send: bool = Field(default=False,
                                 validation_alias=AliasChoices('forbidden_send', 'forbiddenSend',))
    double_frequency: bool = Field(default=False,
                                   validation_alias=AliasChoices('double_frequency', 'doubleFrequency',))
    frequency: float = Field(default=0, validation_alias=AliasChoices('frequency',))
    ctcss: bool = Field(default=False, validation_alias=AliasChoices('ctcss',))
    name: str = Field(default=None, validation_alias=AliasChoices('name',))


channel_mode_schema_map = {
    ChannelMode.CHM25: ChannelCHM25
}
