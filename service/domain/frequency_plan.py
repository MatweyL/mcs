from dataclasses import dataclass, field
from typing import List, Optional

from service.domain.pprch import PPRCH


@dataclass
class FrequencyPlan:
    uid: str = None
    pprchs: List[PPRCH] = field(default_factory=list)

    def find_pprch(self, pprch_uid: str) -> Optional[PPRCH]:
        for pprch in self.pprchs:
            if pprch.uid == pprch_uid:
                return pprch
