from random import randint
from typing import Dict, Any

from service.core.screen.constants.screen_constants import PPRCH_FREQUENCY_PLAN_LIST
from service.core.screen.processor.get.get_screen_processor import GetScreenProcessor
from service.domain.session import Session


class PPRCHFrequencyPlanListGetScreenProcessor(GetScreenProcessor):
    def process(self, session: Session, screen_template: Dict[str, Any], uid: str):
        attributes = screen_template['attributes']
        frequency_plans = session.phone.frequency_plans
        for index, frequency_plan in enumerate(frequency_plans):
            attributes[frequency_plan.uid] = {
                'type': 'CARD_ITEM',
                'label': f"{index + 1} Нет данных ",
                'uid': frequency_plan.uid,
                'used': False
            }

    def get_screen_name(self) -> str:
        return PPRCH_FREQUENCY_PLAN_LIST
