import enum
from typing import List, Generator, Any, Optional

from pydantic import BaseModel, Field, AliasChoices

from app.enums import AttributeName
from app.logs import logger


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
        try:
            attr_value = getattr(self, name)
        except AttributeError:
            try:
                name = name.lower()
                attr_value = getattr(self, name)
            except BaseException:
                logger.warning(f'no field {name} (value: {value}) in {self.__class__.__name__}')
                return
        setattr(self, name, value)
        logger.info(f'updated attr {name} from {attr_value} to {value}')

    def get_attribute(self, name: str):
        try:
            attr_value = getattr(self, name)
        except AttributeError:
            try:
                name = name.lower()
                attr_value = getattr(self, name)
            except BaseException:
                logger.warning(f'no field {name} in {self.__class__.__name__}')
                return
        return attr_value


class ChannelCHM25(Channel):
    channel_mode: ChannelMode = Field(default=ChannelMode.CHM25,
                                      validation_alias=AliasChoices('channel_mode',
                                                                    AttributeName.CHANNEL_MODE))
    prd_forbidden: bool = Field(default=False,
                                validation_alias=AliasChoices('prd_forbidden', 'prdForbidden',
                                                              AttributeName.PRD_FORBIDDEN))
    double_frequency: bool = Field(default=False,
                                   validation_alias=AliasChoices('double_frequency', 'doubleFrequency',
                                                                 AttributeName.DOUBLE_FREQUENCY))
    frequency: float = Field(default=0, validation_alias=AliasChoices('frequency', AttributeName.FREQUENCY))
    ctcss: bool = Field(default=False, validation_alias=AliasChoices('ctcss', AttributeName.CTCSS))
    name: str = Field(default=None, validation_alias=AliasChoices('name', AttributeName.NAME))


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
