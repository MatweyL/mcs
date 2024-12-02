from service.core.screen.constants.screen_constants import DIRECTION_LIST
from service.core.screen.processor.remove.remove_screen_element_processor import RemoveScreenElementProcessor
from service.domain.session import Session


class DirectionRemoveElementScreenProcessor(RemoveScreenElementProcessor):
    def process(self, session: Session, element_id: str):
        phone = session.phone
        founded = phone.find_direction(element_id)
        phone.directions.remove(founded)

    def get_screen_name(self) -> str:
        return DIRECTION_LIST
