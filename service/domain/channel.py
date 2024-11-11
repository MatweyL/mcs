import enum
from dataclasses import dataclass, field

from service.common.utils import convert_str_to_enum_closure


class ChannelMode(str, enum.Enum):
    CHM25 = 'ЧМ25'
    CHM50 = 'ЧМ50'



@dataclass
class Channel:
    uid: str = None
    mode: ChannelMode = field(default=None, metadata={'validate': convert_str_to_enum_closure(ChannelMode)})
    name: str = None
    forbidden_send: bool = None
    double_frequency: bool = None
    frequency: int = None
    ctcss: str = None
