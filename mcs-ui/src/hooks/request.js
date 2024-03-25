import {execute} from "../core/store/execute";

/**
 * Целевой способ вызова запроса для уменьшения объема параметров
 */
export const request = (type, payload, dispatch) => {
    execute(dispatch, {meta: {action: {type, request: true}}, payload})
}