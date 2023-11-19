import API from "../API/api";
import {navigator} from "./navigator";
import {BACK, EDIT, ERASE, INIT, LOAD, SAVE, SELECT} from "./constants";

/// Action - описывают действия, здесь работа с запросами
/// и передача готовых данных в reducer
export const executeAction = (dispatch, action, attribute) => {
    console.log("ACTION", action);
    switch (action) {
        case SELECT: {
            if (attribute.type === "MENU_ITEM") {
                getScreen(attribute.value, dispatch);
            }
            return;
        }

        case BACK: {
            navigator.pop();
            const prevScreen = navigator.tail();
            getScreen(prevScreen, dispatch);
            return;
        }

        case LOAD: {
            const nowScreen = navigator.tail();
            console.log(nowScreen)
            // FIXME: для отладки возвращается константа, когда навигатор пустой
            const screen = nowScreen === undefined ? "SERVICE_MENU" : nowScreen;
            getScreen(screen, dispatch);
            return;
        }

        case EDIT: {
            dispatch({type: EDIT})
            return;
        }

        case ERASE: {
            dispatch({type: ERASE})
            return;
        }

        case SAVE: {
            // TODO: Здесь будет отправляться запрос на сохранение
            // API.saveScreen(data);
            navigator.pop();
            const prevScreen = navigator.tail();
            getScreen(prevScreen, dispatch);
            return;
        }
    }
}

const getScreen = (prevScreen, dispatch) => {
    API.getScreen(prevScreen)
        .then(rs => {
            dispatch({type: INIT, payload: rs.data})
        })
}