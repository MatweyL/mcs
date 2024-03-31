import Actions from "./actions";
import Labels from "./labels";
import Requests from "./requests";

export default class Buttons {
    static SAVE_BUTTON = {action: {type: Requests.SAVE, request: true}, label: Labels.SAVE}
    static SELECT_BUTTON_PARAMS = {action: {type: Requests.SELECT, request: true}, label: Labels.SELECT}

    static ERASE_BUTTON_PARAMS = {action: {type: Actions.ERASE}, label: Labels.ERASE}
    static EDIT_BUTTON_PARAMS = {action: {type: Actions.EDIT}, label: Labels.CHANGE}

    static CLOSE_MENU_BUTTON = {action: {type: Actions.CLOSE_MENU}, label: Labels.BACK}
    static RETURN_BACK_BUTTON = {action: {type: Requests.BACK, request: true}, label: Labels.BACK}
    static CLOSE_SELECT_BOX_BUTTON = {action: {type: Actions.CLOSE_SELECT_BOX}, label: Labels.BACK}

    static OPEN_MENU_BUTTON = {action: {type: Actions.OPEN_MENU}, label: Labels.MENU}

    static OPEN_SPECIFIC_SCREEN = (screen) => {
        return {action: {type: Requests.OPEN_SPECIFIC_SCREEN, request: true}, label: null, payload: screen}
    }

    static OPEN_SELECT_BOX_BUTTON = {action: {type: Actions.OPEN_SELECT_BOX}, label: Labels.SELECT}
    static MULTISELECT_BUTTON = {
        action: {type: Actions.MULTISELECT},
        label: Labels.SELECT,
        items: [
            {label: Labels.EDIT, active: true, action: {type: Requests.OPEN, request: true}},
            {label: Labels.ADD, active: false, action: {type: Requests.CREATE, request: true}},
            {label: Labels.DELETE, active: false, action: {type: Requests.DELETE, request: true}},
        ]
    }

    static SAVE_SELECTED_BUTTON = {action: {type: Actions.SAVE_SELECTED}, label: Labels.SELECT}
}