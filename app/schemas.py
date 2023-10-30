from typing import List, Dict, Optional

from pydantic import BaseModel, Field, AliasChoices

from app.enums import AttributeName, InstructionType, AttributeType, ButtonName


class Event(BaseModel):
    attribute: AttributeName
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
    label: Optional[str] = None
    events: List[Event] = Field(default_factory=list)
    dictionary_type: Optional[str] = Field(default=None, serialization_alias='dictionaryType')
    values: Optional[List[str]] = None


class ButtonOnPress(BaseModel):
    path: str


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
