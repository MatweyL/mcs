import enum


class AttributeName(str, enum.Enum):
    CHANNEL_MODE = "CHANNEL_MODE"
    SAMPLE_TEXT = "SAMPLE_TEXT"
    FORBIDDEN_SEND = "FORBIDDEN_SEND"
    DOUBLE_FREQUENCY = "DOUBLE_FREQUENCY"
    FREQUENCY = "FREQUENCY"
    NAME = "NAME"
    CTCSS = "CTCSS"


class AttributeType(str, enum.Enum):
    DICTIONARY = "DICTIONARY"
    BOOLEAN = "BOOLEAN"
    INTEGER = "INTEGER"
    DOUBLE = "DOUBLE"
    TEXT = "TEXT"


class InstructionType(str, enum.Enum):
    SHOW = "SHOW"
    HIDE = "HIDE"


class ButtonName(str, enum.Enum):
    BUTTON_SELECT = "BUTTON_SELECT"
    BUTTON_BACK = "BUTTON_BACK"
    BUTTON_ERASE = "BUTTON_ERASE"
