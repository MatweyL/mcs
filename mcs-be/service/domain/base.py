from typing import Any

from service.common.logs import logger


def update_attribute(obj, name: str, value: Any):
    try:
        attr_value = getattr(obj, name)
    except AttributeError:
        try:
            name = name.lower()
            attr_value = getattr(obj, name)
        except BaseException:
            logger.warning(f'no field {name} (value: {value}) in {obj.__class__.__name__}')
            raise ValueError(f'wrong attr name: {name} for obj: {obj}')
    setattr(obj, name, value)
    logger.info(f'updated attr {name} from {attr_value} to {value} for {obj.__class__.__name__}')


def get_attribute(obj, name: str):
    try:
        attr_value = getattr(obj, name)
    except AttributeError:
        try:
            name = name.lower()
            attr_value = getattr(obj, name)
        except BaseException:
            logger.warning(f'no field {name} in {obj.__class__.__name__}')
            raise ValueError(f'wrong attr name: {name} for obj: {obj}')
    return attr_value


def get_attribute_from_dict(name: str, dictionary: dict, ignore_case: bool = True):
    try:
        value = dictionary[name]
    except KeyError as e:
        if ignore_case:
            value = dictionary[name.lower()]
        else:
            raise e
    return value
