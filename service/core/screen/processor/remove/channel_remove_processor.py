from service.core.screen.constants.screen_constants import CHANNEL_LIST
from service.core.screen.processor.remove.remove_screen_element_processor import RemoveScreenElementProcessor
from service.domain.session import Session


class ChannelRemoveElementScreenProcessor(RemoveScreenElementProcessor):
    def process(self, session: Session, element_id: str):
        phone = session.phone
        founded = phone.find_channel(element_id)
        phone.channels.remove(founded)

        for direction in phone.directions:
            if direction.channel == element_id:
                direction.channel = None

    def get_screen_name(self) -> str:
        return CHANNEL_LIST
