import enum
from typing import List, Dict

from pydantic import BaseModel, Field, AliasChoices


class AttributeName(str, enum.Enum):
    CHANNEL_MODE = "CHANNEL_MODE"
    SAMPLE_TEXT = "SAMPLE_TEXT"
    FORBIDDEN_SEND = "FORBIDDEN_SEND"
    DOUBLE_FREQUENCY = "DOUBLE_FREQUENCY"


class AttributeType(str, enum.Enum):
    DICTIONARY = "DICTIONARY"
    BOOLEAN = "BOOLEAN"
    INTEGER = "INTEGER"
    DOUBLE = "DOUBLE"
    TEXT = "TEXT"


class InstructionType(str, enum.Enum):
    SHOW = "SHOW"
    HIDE = "HIDE"


class Event(BaseModel):
    attribute_name: AttributeName
    instructions: List[InstructionType] = Field(default_factory=list)
    firing_values: List[str | bool | int | float] = Field(default_factory=list,
                                                          validation_alias=AliasChoices('firing_values',
                                                                                        'firingValues'),
                                                          serialization_alias='firingValues')
    exclude_firing_values: List[str | bool | int | float] = Field(default_factory=list,
                                                                  validation_alias=AliasChoices('exclude_firing_values',
                                                                                                'excludeFiringValues'),
                                                                  serialization_alias='excludeFiringValues')


class Attribute(BaseModel):
    name: AttributeName
    type: AttributeType
    label: str
    events: List[Event] = Field(default_factory=list)


class ButtonOnPress(BaseModel):
    path: str


class ButtonName(str, enum.Enum):
    BUTTON_SELECT = "BUTTON_SELECT"
    BUTTON_BACK = "BUTTON_BACK"


class Button(BaseModel):
    name: ButtonName
    label: str
    on_press: ButtonOnPress = Field(validation_alias=AliasChoices('on_press', 'onPress'),
                                    serialization_alias='onPress')


class Screen(BaseModel):
    name: str
    label: str
    attributes: Dict[AttributeName, Attribute]
    buttons: Dict[ButtonName, Button]
    buttons_list: List[ButtonName]
