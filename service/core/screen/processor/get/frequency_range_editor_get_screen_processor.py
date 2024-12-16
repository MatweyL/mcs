from typing import Dict, Any, Optional

from service.common.logs import logger
from service.core.screen.constants.screen_constants import FREQUENCY_RANGE_EDITOR
from service.core.screen.processor.get.get_screen_processor import GetScreenProcessor
from service.domain.session import Session


class FrequencyRangeEditorGetScreenProcessor(GetScreenProcessor):

    def process(self, session: Session, screen_template: Dict[str, Any], uid: str):
        logger.info(f'{self.get_screen_name()} PROCESSOR CALLED')
        if not uid:
            return

        found_pprch = None
        for frequency_plan in session.phone.frequency_plans:
            found_pprch = frequency_plan.find_pprch(uid)
            if found_pprch:
                break

        if not found_pprch:
            return

        attributes = screen_template['attributes']
        attributes['PLAN_ID']['value'] = found_pprch.uid
        attributes['HIGH_FREQUENCY']['value'] = found_pprch.higher
        attributes['LOW_FREQUENCY']['value'] = found_pprch.lower

    def get_screen_name(self) -> str:
        return FREQUENCY_RANGE_EDITOR
