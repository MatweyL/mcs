import enum
from dataclasses import dataclass


class ChannelMode(str, enum.Enum):
    CHM25 = 'CHM25'
    CHM50 = 'CHM50'


@dataclass
class Channel:
    uid: str = None
    mode: str = None
    name: str = None
    forbidden_send: bool = None
    double_frequency: bool = None
    frequency: int = None
    ctcss: str = None
