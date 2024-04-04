from dataclasses import dataclass


@dataclass
class Channel:
    uid: str = None
    mode: str = None
    name: str = None
    forbidden_send: bool = None
    double_frequency: bool = None
    frequency: str = None
    ctcss: str = None
