from typing import Dict, Any

from service.common.utils import generate_uid
from service.core.screen.processor.save import SaveScreenProcessor
from service.domain.direction import Direction
from service.domain.session import Session


class DirectionEditorSaveScreenProcessor(SaveScreenProcessor):
    def process(self, session: Session, attributes: Dict[str, Any]):
        direction_id = attributes.get('DIRECTION_ID')
        phone = session.phone
        if direction_id:
            direction = phone.find_direction(direction_id)
            self._fill_direction(direction, attributes)
        else:
            direction = Direction(uid=generate_uid())
            self._fill_direction(direction, attributes)
            phone.directions.append(direction)

    def _fill_direction(self, direction: Direction, attributes: Dict[str, Any]):
        direction.name = attributes.get('NAME')

    def get_screen_name(self) -> str:
        return "DIRECTION_EDITOR"
