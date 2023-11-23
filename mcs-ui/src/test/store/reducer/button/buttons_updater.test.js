import {ButtonsUpdater} from "../../../../store/reducer/button/buttons_updater";
import Attributes from "../../../../store/constants/attributes";
import Buttons from "../../../../store/constants/buttons";

describe('ButtonsUpdater', () => {
    const updater = new ButtonsUpdater();

    test.each`
    type                     | left                          | right
    ${Attributes.SELECT_BOX} ${Buttons.SAVE_BUTTON}          ${Buttons.OPEN_SELECT_BOX_BUTTON}
    ${Attributes.TEXT}       ${Buttons.SAVE_BUTTON}          ${Buttons.ERASE_BUTTON_PARAMS}
    ${Attributes.CHECKBOX}   ${Buttons.SAVE_BUTTON}          ${Buttons.EDIT_BUTTON_PARAMS}
    ${Attributes.MENU_ITEM}  ${Buttons.SELECT_BUTTON_PARAMS} ${Buttons.RETURN_BACK_BUTTON}
    ${Attributes.CARD_ITEM}  ${Buttons.OPEN_MENU_BUTTON}     ${Buttons.RETURN_BACK_BUTTON}
    
    `('должен при смене атрибута устанавливать нужные кнопки', ({type, left, right}) => {
        // GIVEN
        const state = {buttons: {}}

        // WHEN
        updater.update(type, state)

        // THEN
        expect(state.buttons.leftButton).toBe(left);
        expect(state.buttons.rightButton).toBe(right);
    })
})