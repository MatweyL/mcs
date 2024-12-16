from typing import Dict, Any

from service.common.utils import generate_uid
from service.core.screen.constants.screen_constants import FREQUENCY_RANGE_EDITOR
from service.core.screen.processor.save.save_screen_processor import SaveScreenProcessor
from service.domain.channel import Channel, ChannelMode
from service.domain.pprch import PPRCH
from service.domain.session import Session


class FrequencyRangeEditorSaveScreenProcessor(SaveScreenProcessor):
    def process(self, session: Session, attributes: Dict[str, Any]):
        pprch_uid = attributes.get('PPRCH_ID')
        phone = session.phone
        if pprch_uid:
            pprch = None
            for frequency_plan in phone.frequency_plans:
                pprch = frequency_plan.find_pprch(pprch_uid)
                if pprch:
                    break
            self._fill_pprch(pprch, attributes)
        else:
            channel = PPRCH(uid=generate_uid())
            self._fill_pprch(channel, attributes)
            phone.channels.append(channel)

    def _fill_pprch(self, pprch: PPRCH, attributes: Dict[str, Any]):
        pprch.higher = attributes.get('HIGH_FREQUENCY')
        pprch.lower = attributes.get('LOW_FREQUENCY')

    def get_screen_name(self) -> str:
        return FREQUENCY_RANGE_EDITOR
