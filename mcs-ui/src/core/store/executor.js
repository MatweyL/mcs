import {executeRequest} from "./request";
import Actions from "../constants/actions";

/**
 * Маршрутизирует действия по их типу
 */
export const execute = (dispatch, data) => {
    const {meta, payload} = data;
    console.log(data);

    if (meta.request) {
        executeRequest(dispatch, {type: meta.type, payload})
    } else if (meta.type === Actions.MULTISELECT) {
        // Особый случай для обработки MULTISELECT - рекурсивный вызов
        execute(dispatch, processMultiselect(data))
    } else {
        dispatch({type: meta.type, payload})
    }
}

const processMultiselect = (data) => {
    const {payload} = data;
    const {attribute, actionContainer} = payload;

    const activeItem = actionContainer.items.find(item => item.active);
    const actionType = activeItem.action.type;

    return {type: actionType, payload: attribute}
}
