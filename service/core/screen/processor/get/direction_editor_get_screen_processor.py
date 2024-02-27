from typing import Dict, Any

from service.common.logs import logger
from service.core.screen.processor.get.get_screen_processor import GetScreenProcessor
from service.domain.session import Session


class DirectionEditorGetScreenProcessor(GetScreenProcessor):
    def process(self, session: Session, screen_template: Dict[str, Any], uid: str):
        logger.info('DIRECTION EDITOR PROCESSOR CALLED')
        if not uid:
            return

        found_direction = session.phone.find_direction(uid)

        if not found_direction:
            return

        attributes = screen_template['attributes']
        attributes['DIRECTION_ID']['value'] = found_direction.uid
        attributes['CHANNEL']['value'] = found_direction.channel
        attributes['NAME']['value'] = found_direction.name
        attributes['FORBIDDEN_SEND']['value'] = found_direction.forbidden_send
        attributes['SCAN_LIST']['value'] = found_direction.scan_list
        attributes['ECONOMIZER']['value'] = found_direction.economizer
        attributes['TONE_CALL']['value'] = found_direction.tone_call

    def get_screen_name(self) -> str:
        return 'DIRECTION_EDITOR'
