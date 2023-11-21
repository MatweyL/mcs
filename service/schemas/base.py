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
            return
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
            return
    return attr_value
