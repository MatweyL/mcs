import {execute} from "../core/store/execute";

/**
 * Целевой способ вызова action'ов для уменьшения объема параметров
 */
export const action = (type, payload, dispatch) => {
    execute(dispatch, {meta: {action: {type}}, payload})
}