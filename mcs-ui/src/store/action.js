import API from "../API/api";
import {navigator} from "./navigator";
import {
    BACK,
    CLOSE_MENU,
    CLOSE_SELECT_BOX,
    CREATE,
    DELETE,
    DICTIONARY,
    EDIT,
    ERASE,
    INIT,
    LOAD,
    MULTISELECT,
    OPEN,
    OPEN_MENU,
    OPEN_SELECT_BOX,
    SAVE, SAVE_SELECTED,
    SELECT
} from "./constants";
import {convertState} from "./util";

/// Action - описывают действия, здесь работа с запросами
/// и передача готовых данных в reducer
export const executeAction = async (dispatch, actionHolder, attribute,  state) => {
    const action = actionHolder.action;
    console.log("ACTION", action);
    switch (action) {
        case SELECT: {
            if (attribute.type === "MENU_ITEM") {
                getScreen(attribute.value, dispatch);
            }
            return;
        }

        case OPEN_MENU: {
            dispatch({type: OPEN_MENU}, )
            return;
        }

        case CLOSE_MENU: {
            dispatch({type: CLOSE_MENU})
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

        case OPEN_SELECT_BOX: {
            dispatch({type: OPEN_SELECT_BOX, payload: attribute})
            return;
        }

        case CLOSE_SELECT_BOX: {
            dispatch({type: CLOSE_SELECT_BOX, payload: attribute})
            return;
        }

        case SAVE_SELECTED: {
            dispatch({type: SAVE_SELECTED, payload: attribute})
            return;
        }

        case MULTISELECT: {
            const activeItem = actionHolder.items.find(item => item.active);
            const action = activeItem.action;
            executeAction(dispatch, {action}, attribute)
            return;
        }

        case OPEN: {
            // открытие страницы с существующим эл-том
            return;
        }

        case DELETE: {
            // удаление выбранного элемента
            return;
        }

        case CREATE: {
            // создание нового эл-та == переход на страницу
            return;
        }

        case SAVE: {
            // TODO: Здесь будет отправляться запрос на сохранение
            API.saveScreen(convertState(state))
                .then(() => {{
                    // TODO: Возможно логику по возврату к предыдущей странице нужно поместить где-то в другом месте?
                    navigator.pop();
                    const prevScreen = navigator.tail();
                    getScreen(prevScreen, dispatch);
                }})

            return;
        }
    }
}

const getScreen = async (prevScreen, dispatch) => {
    const response = await API.getScreen(prevScreen);
    const data = response.data;

    const attributes = data.attributes;
    const dictionaries = Object.keys(attributes)
        .filter(name => attributes[name].type === DICTIONARY);

    console.log(dictionaries);
    for (let dictionaryName of dictionaries) {
        console.log(dictionaryName);
        await fillDictionary(attributes[dictionaryName]);
    }

    dispatch({type: INIT, payload: data});
}

const fillDictionary = async (emptyDictionary) => {
    const response = await API.getDictionary(
        emptyDictionary.dictionaryType,
        emptyDictionary.noCache
    );
    emptyDictionary.dictionaryValues = response.data.dictionaryValues;
}