import enum
from typing import List, Generator, Any, Optional

from pydantic import BaseModel, Field, AliasChoices

from service.schemas.base import update_attribute, get_attribute


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
    channel_id: str
    channel_mode: ChannelMode

    def update_attribute(self, name: str, value: Any):
        update_attribute(self, name, value)

    def get_attribute(self, name: str):
        return get_attribute(self, name)


class ChannelCHM25(Channel):
    channel_mode: ChannelMode = Field(default=ChannelMode.CHM25,
                                      validation_alias=AliasChoices('channel_mode',))
    prd_forbidden: bool = Field(default=False,
                                validation_alias=AliasChoices('prd_forbidden', 'prdForbidden',))
    double_frequency: bool = Field(default=False,
                                   validation_alias=AliasChoices('double_frequency', 'doubleFrequency',))
    frequency: float = Field(default=0, validation_alias=AliasChoices('frequency',))
    ctcss: bool = Field(default=False, validation_alias=AliasChoices('ctcss',))
    name: str = Field(default=None, validation_alias=AliasChoices('name',))


channel_mode_schema_map = {
    ChannelMode.CHM25: ChannelCHM25
}


class Phone:

    def __init__(self, channels: List[Channel]):
        self._channels = channels

    def iter_channels(self) -> Generator[Channel, Any, None]:
        for channel in self._channels:
            yield channel

    def get_channel_by_mode(self, channel_mode: ChannelMode) -> Channel:
        for channel in self.iter_channels():
            if channel.channel_mode == channel_mode:
                return channel
        raise ValueError(f"no channel with mode: {channel_mode}")

    def add_channel(self, channel: Channel):
        self._channels.append(channel)

    def get_attribute(self, name: str):
        for channel in self.iter_channels():
            if channel.channel_mode == name:
                return channel
        raise ValueError(f'no attribute with name: {name}')

    def get_channel(self, channel_id: str) -> Optional[Channel]:
        for channel in self._channels:
            if channel.channel_id == channel_id:
                return channel

    def get_element_by_id(self, id: str):
        """ Ищет во всех полях объект с заданным атрибутом """
        for channel in self._channels:
            if channel.channel_id == id:
                return channel
