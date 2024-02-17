import {executeRequest} from "./execute_request";
import Actions from "../constants/actions";

/**
 * Маршрутизирует действия по их типу
 */
export const execute = (dispatch, data) => {
    const {meta, payload} = data;
    const {action} = meta;
    console.log(data);

    if (action.request) {
        executeRequest(dispatch, {type: action.type, payload})
    } else if (action.type === Actions.MULTISELECT) {
        // Особый случай для обработки MULTISELECT - рекурсивный вызов
        execute(dispatch, processMultiselect(data))
    } else {
        dispatch({type: action.type, payload})
    }
}

const processMultiselect = (data) => {
    const {meta, payload} = data;
    const {attribute} = payload;

    const activeItem = meta.items.find(item => item.active);
    const action = activeItem.action;

    return {meta: {action}, payload}
}
