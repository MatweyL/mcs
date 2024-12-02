from typing import Dict, Any

from service.core.screen.processor.get.get_screen_processor import GetScreenProcessor
from service.domain.session import Session


class SelectActiveDirectionGetScreenProcessor(GetScreenProcessor):

    def process(self, session: Session, screen_template: Dict[str, Any], uid: str):
        attributes = screen_template['attributes']
        directions = session.phone.directions
        for direction in directions:
            attributes[direction.uid] = {
                'type': 'SELECTABLE_CARD_ITEM',
                'label': direction.name,
                'uid': direction.uid,
                'used': session.phone.active_direction == direction.uid
            }

    def get_screen_name(self) -> str:
        return 'SELECT_ACTIVE_DIRECTION'
