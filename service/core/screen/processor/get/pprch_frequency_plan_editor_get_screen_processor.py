from random import randint
from typing import Dict, Any

from service.core.screen.constants.screen_constants import PPRCH_FREQUENCY_PLAN_LIST
from service.core.screen.processor.get.get_screen_processor import GetScreenProcessor
from service.domain.session import Session


class PPRCHFrequencyPlanEditorGetScreenProcessor(GetScreenProcessor):
    def process(self, session: Session, screen_template: Dict[str, Any], uid: str):
        attributes = screen_template['attributes']
        frequency_plan = session.phone.find_frequency_plan(uid)
        for pprch in frequency_plan.pprchs:
            attributes[pprch.uid] = {
                'type': 'CARD_ITEM',
                'label': f"{pprch.lower} - {pprch.higher} МГц\nСредний RSSI - {round(randint(2500, 6500) / 100)} дБм",
                'uid': pprch.uid,
                'used': False
            }

    def get_screen_name(self) -> str:
        return PPRCH_FREQUENCY_PLAN_LIST
