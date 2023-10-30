from app.schemas import Button, ButtonName, ButtonOnPress


def test_button():
    button = Button(name=ButtonName.BUTTON_BACK, label='Назад',
                    on_press=ButtonOnPress(path='/back'))
    button_dict = button.model_dump(by_alias=True)
    assert 'onPress' in button_dict
    button_restored = Button.model_validate(button_dict)
