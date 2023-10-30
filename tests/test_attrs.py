from app.schemas import Button, ButtonOnPress, ButtonName, Screen
from app.services import ScreenBuilder


def test_button():
    button = Button(name=ButtonName.BUTTON_BACK, label='Назад',
                    on_press=ButtonOnPress(path='/back'))
    button_dict = button.model_dump(by_alias=True)
    assert 'onPress' in button_dict
    button_restored = Button.model_validate(button_dict)


def test_screen_builder():
    screen_builder = ScreenBuilder()
    screen = screen_builder.build(r"D:\Programming\vuts\mcs\screens\CHANNEL_EDITOR.json")
