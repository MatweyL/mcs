from dataclasses import dataclass


@dataclass
class Channel:
    uid: str = None
    mode: str = None
    name: str = None

