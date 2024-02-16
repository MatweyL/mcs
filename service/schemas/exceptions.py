class AttributeNotSpecifiedException(Exception):
    def __init__(self, name: str = None):
        super(AttributeNotSpecifiedException, self).__init__(f"No attribute {name} in json")


class NoChannelWithIdException(Exception):
    def __init__(self):
        super(NoChannelWithIdException, self).__init__("No channel with this id")


class WrongAttributeValueException(Exception):
    def __init__(self, wrong_value=None, correct_values=None):
        super(WrongAttributeValueException, self).__init__(f"{wrong_value} not in {correct_values}")


class NoProcessorWithScreenNameException(Exception):
    def __init__(self, screen_name: str = None):
        super(NoProcessorWithScreenNameException, self).__init__(f"No processor with {screen_name}")
