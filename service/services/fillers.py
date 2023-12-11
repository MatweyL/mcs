from copy import deepcopy

from service.common.logs import logger
from service.schemas.base import get_attribute


class ScreenFiller:

    def __init__(self):
        pass

    def fill(self, screen: dict, obj):
        filled_screen = deepcopy(screen)
        for attribute_name, attribute_dict in filled_screen['attributes'].items():
            try:
                value = get_attribute(obj, attribute_name)
            except ValueError as e:
                logger.exception(e)
            else:
                attribute_dict['value'] = value
        return filled_screen
