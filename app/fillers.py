from app.phone import Phone, channel_mode_schema_map, ChannelMode
from app.schemas import ScreenUpdated, Screen

#
# screen_filler_map {
#     screen_name: ScreenUpdater
# }

class PhoneChannelFiller:

    def __init__(self, phone: Phone):
        self._screen_name = "CHANNEL_EDITOR"
        self._phone = phone

    def fill(self, screen_updated: ScreenUpdated):
        if screen_updated.name == self._screen_name:
            channel_mode = None
            for updated_attribute in screen_updated.attributes:
                if updated_attribute.name == "CHANNEL_MODE":
                    channel_mode = updated_attribute.value
                    break
            if not channel_mode:
                raise RuntimeError(f"unspecified channel mode: {screen_updated.attributes}")
            try:
                channel = self._phone.get_channel_by_mode(channel_mode)
            except ValueError:
                channel = channel_mode_schema_map[channel_mode]()
                self._phone.add_channel(channel)
            for updated_attribute in screen_updated.attributes:
                channel.update_attribute(updated_attribute.name, updated_attribute.value)

        else:
            raise RuntimeError(f"Unknown screen: {screen_updated.name}")


class ScreenChannelEditorFiller:

    def __init__(self, phone: Phone):
        self._phone = phone

    def fill(self, screen: Screen, channel_mode: ChannelMode) -> Screen:
        if screen.name == "CHANNEL_EDITOR":
            try:
                channel = self._phone.get_channel_by_mode(channel_mode)
            except ValueError:
                channel = channel_mode_schema_map[channel_mode]()
                self._phone.add_channel(channel)
            for attribute in screen.attributes.values():
                attribute.value = channel.get_attribute(attribute.name)
        return screen
