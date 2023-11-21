import pprint
from pathlib import Path

from app.phone import ChannelCHM25
from app.schemas import Button, ButtonOnPress, ButtonName
from app.services import ScreenBuilder


def test_button():
    button = Button(name=ButtonName.BUTTON_BACK, label='Назад',
                    on_press=ButtonOnPress(path='/back'))
    button_dict = button.model_dump(by_alias=True)
    assert 'onPress' in button_dict
    button_restored = Button.model_validate(button_dict)


def test_screen_builder():
    screen_builder = ScreenBuilder(r"D:\Programming\vuts\mcs\screens")
    screen = screen_builder.build(r"CHANNEL_EDITOR.json")

    pprint.pprint(screen.model_dump())
    Path('dumped.json').write_text(screen.model_dump_json(by_alias=True, indent=2), encoding='utf-8')


def test_channel_updating():
    channel = ChannelCHM25()
    channel.update_attribute('frequency', 25)
    channel.update_attribute('FREQUENCY', 50)
