from typing import Dict, Any

from service.common.utils import generate_uid
from service.core.screen.processor.save import SaveScreenProcessor
from service.domain.channel import Channel
from service.domain.direction import Direction
from service.domain.phone import Phone
from service.domain.session import Session


class DirectionEditorSaveScreenProcessor(SaveScreenProcessor):
    def process(self, session: Session, attributes: Dict[str, Any]):
        direction_id = attributes.get('DIRECTION_ID')
        phone = session.phone
        if direction_id:
            direction = phone.find_direction(direction_id)
            self._fill_direction(direction, attributes, phone)
        else:
            direction = Direction(uid=generate_uid())
            self._fill_direction(direction, attributes, phone)
            phone.directions.append(direction)

    def _fill_direction(self, direction: Direction, attributes: Dict[str, Any], phone: Phone):
        direction.name = attributes.get('NAME')
        direction.channel = attributes.get('CHANNEL')
        direction.forbidden_send = attributes.get('FORBIDDEN_SEND')
        direction.tone_call = attributes.get('TONE_CALL')
        direction.scan_list = attributes.get('SCAN_LIST')
        direction.economizer = attributes.get('ECONOMIZER')

    def get_screen_name(self, *args, **kwargs) -> str:
        return "DIRECTION_EDITOR"
