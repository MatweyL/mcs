import ButtonsLayout from "../../constants/buttons_layout";
import Attributes from "../../constants/attributes";
import Buttons from "../../constants/buttons";

export class ButtonsFactory {
    create(attributeType) {
        return {
            leftButton: BUTTONS_STATE[ButtonsLayout.LEFT][attributeType],
            rightButton: BUTTONS_STATE[ButtonsLayout.RIGHT][attributeType],
        }
    }
}

const BUTTONS_STATE = {
    [ButtonsLayout.LEFT]: {
        [Attributes.SELECT_BOX]: Buttons.SAVE_BUTTON,
        [Attributes.TEXT]: Buttons.SAVE_BUTTON,
        [Attributes.CHECKBOX]: Buttons.SAVE_BUTTON,
        [Attributes.MENU_ITEM]: Buttons.SELECT_BUTTON_PARAMS,
        [Attributes.CARD_ITEM]: Buttons.OPEN_MENU_BUTTON,
    },
    [ButtonsLayout.RIGHT]: {
        [Attributes.SELECT_BOX]: Buttons.OPEN_SELECT_BOX_BUTTON,
        [Attributes.TEXT]: Buttons.ERASE_BUTTON_PARAMS,
        [Attributes.CHECKBOX]: Buttons.EDIT_BUTTON_PARAMS,
        [Attributes.MENU_ITEM]: Buttons.RETURN_BACK_BUTTON,
        [Attributes.CARD_ITEM]: Buttons.RETURN_BACK_BUTTON,
    }
}