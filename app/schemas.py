import enum
from typing import List, Dict

from pydantic import BaseModel, Field, AliasChoices


class AttributeName(str, enum.Enum):
    CHANNEL_MODE = "CHANNEL_MODE"
    SAMPLE_TEXT = "SAMPLE_TEXT"
    FORBIDDEN_SEND = "FORBIDDEN_SEND"
    BUTTON_SELECT = "BUTTON_SELECT"
    BUTTON_BACK = "BUTTON_BACK"


class AttributeType(str, enum.Enum):
    DICTIONARY = "DICTIONARY"
    BOOLEAN = "BOOLEAN"
    INTEGER = "INTEGER"
    DOUBLE = "DOUBLE"
    TEXT = "TEXT"


class Attribute(BaseModel):
    name: AttributeName
    type: AttributeType


class AttributesMap(BaseModel):
    map: Dict[AttributeName, Attribute]

    def __getitem__(self, item: AttributeName | str):
        return self.map[item]

    def __setitem__(self, key: AttributeName, value: Attribute):
        self.map[key] = value


class ButtonName(str, enum.Enum):
    BUTTON_BACK = "BUTTON_BACK"
    BUTTON_SELECT = "BUTTON_SELECT"


class ButtonOnPress(BaseModel):
    path: str


class Button(BaseModel):
    name: ButtonName
    label: str
    on_press: ButtonOnPress = Field(validation_alias=AliasChoices('on_press', 'onPress'), serialization_alias='onPress')


class Screen(BaseModel):
    name: str
    label: str
    attributes: AttributesMap
    buttons: Dict
    buttons_list: List[ButtonName]
