import Actions from "./actions";
import Labels from "./labels";

export default class Buttons {
    static SAVE_BUTTON = {action: Actions.SAVE, label: Labels.SAVE}
    static SELECT_BUTTON_PARAMS = {action: Actions.SELECT, label: Labels.SELECT}

    static ERASE_BUTTON_PARAMS = {action: Actions.ERASE, label: Labels.ERASE}
    static EDIT_BUTTON_PARAMS = {action: Actions.EDIT, label: Labels.CHANGE}

    static CLOSE_MENU_BUTTON = {action: Actions.CLOSE_MENU, label: Labels.BACK}
    static RETURN_BACK_BUTTON = {action: Actions.BACK, label: Labels.BACK}
    static CLOSE_SELECT_BOX_BUTTON = {action: Actions.CLOSE_SELECT_BOX, label: Labels.BACK}

    static OPEN_MENU_BUTTON = {action: Actions.OPEN_MENU, label: Labels.MENU}

    static OPEN_SELECT_BOX_BUTTON = {action: Actions.OPEN_SELECT_BOX, label: Labels.SELECT}
    static MULTISELECT_BUTTON = {
        action: Actions.MULTISELECT, label: Labels.SELECT, items: [
            {label: Labels.EDIT, active: true, action: Actions.OPEN},
            {label: Labels.ADD, active: false, action: Actions.CREATE},
            {label: Labels.DELETE, active: false, action: Actions.DELETE},
        ]
    }

    static SAVE_SELECTED_BUTTON = {action: Actions.SAVE_SELECTED, label: Labels.SELECT}
}