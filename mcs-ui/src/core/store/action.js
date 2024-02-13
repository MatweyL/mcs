import API from "../../API/api";
import {navigator} from "./screen/navigator";

import {convertState} from "./util";
import Actions from "../constants/actions";
import Attributes from "../constants/attributes";
import {screenService} from "../di";

// FIXME: перенести запросы в executeRequest
/**
 * Action - описывают действия, здесь работа с запросами и передача готовых данных в reducer
 */
export const executeAction = async (dispatch, actionHolder, attribute,  state) => {
    const action = actionHolder.action;
    console.log("ACTION", action);
    switch (action) {

        // По сути не нужно -> просто проксируются запросы в dispatch
        case Actions.OPEN_MENU: {
            dispatch({type: Actions.OPEN_MENU}, )
            return;
        }

        case Actions.CLOSE_MENU: {
            dispatch({type: Actions.CLOSE_MENU})
            return;
        }

        case Actions.EDIT: {
            dispatch({type: Actions.EDIT, payload: attribute})
            return;
        }

        case Actions.ERASE: {
            dispatch({type: Actions.ERASE})
            return;
        }

        case Actions.OPEN_SELECT_BOX: {
            dispatch({type: Actions.OPEN_SELECT_BOX, payload: attribute})
            return;
        }

        case Actions.CLOSE_SELECT_BOX: {
            dispatch({type: Actions.CLOSE_SELECT_BOX, payload: attribute})
            return;
        }

        case Actions.SAVE_SELECTED: {
            dispatch({type: Actions.SAVE_SELECTED, payload: attribute})
            return;
        }

        // Получение данных
        case Actions.BACK: {
            navigator.pop();
            const prevScreen = navigator.tail();
            screenService.getScreen(prevScreen)
                .then(screenData => {
                    dispatch({type: Actions.INIT, payload: screenData})
                })
            return;
        }

        case Actions.SELECT: {
            if (attribute.type === Attributes.MENU_ITEM) {
                screenService.getScreen(attribute.value)
                    .then(screenData => {
                        dispatch({type: Actions.INIT, payload: screenData})
                    })
            }
            return;
        }

        case Actions.LOAD: {
            const nowScreen = navigator.tail();
            console.log(nowScreen)
            // FIXME: для отладки возвращается константа, когда навигатор пустой
            const screen = nowScreen === undefined ? "SERVICE_MENU" : nowScreen;
            screenService.getScreen(screen)
                .then(screenData => {
                    dispatch({type: Actions.INIT, payload: screenData})
                })
            return;
        }

        case Actions.MULTISELECT: {
            const activeItem = actionHolder.items.find(item => item.active);
            const action = activeItem.action;
            await executeAction(dispatch, {action}, attribute)
            return;
        }

        case Actions.SAVE: {
            // TODO: Здесь будет отправляться запрос на сохранение
            API.saveScreen(convertState(state))
                .then(() => {{
                    // TODO: Возможно логику по возврату к предыдущей странице нужно поместить где-то в другом месте?
                    navigator.pop();
                    const prevScreen = navigator.tail();
                    screenService.getScreen(prevScreen)
                        .then(screenData => {
                            dispatch({type: Actions.INIT, payload: screenData})
                        })
                }})

            return;
        }

        case Actions.OPEN: {
            // открытие страницы с существующим эл-том
            return;
        }

        case Actions.DELETE: {
            // удаление выбранного элемента
            return;
        }

        case Actions.CREATE: {
            // создание нового эл-та == переход на страницу
            return;
        }
    }
}

