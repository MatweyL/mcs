import API from "../API/api";
import {navigator} from "./navigator";

/// Action - описывают действия, здесь работа с запросами
/// и передача готовых данных в reducer

export const executeAction = (dispatch, action, attribute) => {
    console.log("ACTION", action);
    switch (action) {
        case "SELECT": {
            if (attribute.type === "MENU_ITEM") {
                API.getScreen(attribute.value)
                    .then(rs => {
                        dispatch({type: "INIT", payload: rs.data})
                    });
            }
            return;
        }

        case "BACK": {
            navigator.pop();
            const prevScreen = navigator.tail();
            API.getScreen(prevScreen)
                .then(rs => {
                    dispatch({type: "INIT", payload: rs.data})
                })
            return;
        }

        case "LOAD": {
            const nowScreen = navigator.tail();
            API.getScreen(nowScreen)
                .then(rs => {
                    dispatch({type: "INIT", payload: rs.data})
                })
            return;
        }

        case "EDIT": {
            dispatch({type: "EDIT"})
            return;
        }

        case "ERASE": {
            dispatch({type: "ERASE"})
            return;
        }

        case "SAVE": {
            // запрос на сохранение
            navigator.pop();
            const prevScreen = navigator.tail();
            API.getScreen(prevScreen)
                .then(rs => {
                    dispatch({type: "INIT", payload: rs.data})
                })
            return;
        }
    }
}