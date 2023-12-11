import Actions from "./actions";
import Labels from "./labels";
import Requests from "./requests";

export default class Buttons {
    static SAVE_BUTTON = {action: Requests.SAVE, label: Labels.SAVE}
    static SELECT_BUTTON_PARAMS = {action: Actions.SELECT, label: Labels.SELECT}

    static ERASE_BUTTON_PARAMS = {action: Actions.ERASE, label: Labels.ERASE}
    static EDIT_BUTTON_PARAMS = {action: Actions.EDIT, label: Labels.CHANGE}

    static CLOSE_MENU_BUTTON = {action: Actions.CLOSE_MENU, label: Labels.BACK}
    static RETURN_BACK_BUTTON = {action: Requests.BACK, label: Labels.BACK}
    static CLOSE_SELECT_BOX_BUTTON = {action: Actions.CLOSE_SELECT_BOX, label: Labels.BACK}

    static OPEN_MENU_BUTTON = {action: Actions.OPEN_MENU, label: Labels.MENU}

    static OPEN_SELECT_BOX_BUTTON = {action: Actions.OPEN_SELECT_BOX, label: Labels.SELECT}
    static MULTISELECT_BUTTON = {
        action: Actions.MULTISELECT, label: Labels.SELECT, items: [
            {label: Labels.EDIT, active: true, action: Requests.OPEN},
            {label: Labels.ADD, active: false, action: Requests.CREATE},
            {label: Labels.DELETE, active: false, action: Requests.DELETE},
        ]
    }

    static SAVE_SELECTED_BUTTON = {action: Actions.SAVE_SELECTED, label: Labels.SELECT}
}