from dataclasses import dataclass

from service.domain.channel import Channel


@dataclass
class Direction:
    uid: str = None
    name: str = None
    channel: str = None
    forbidden_send: bool = None
    tone_call: bool = None
    scan_list: str = None
    economizer: str = None

