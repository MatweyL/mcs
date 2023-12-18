import API from "../API/api";
import {navigator} from "./navigator";

import {convertState} from "./util";
import Actions from "./constants/actions";
import Attributes from "./constants/attributes";
import Requests from "./constants/requests";
import AttributeHelper from "./helper/attribute_helper";

/// Requests - описывают запросы, к-е необходимов выполнить перед осуществлением действий по изменению состояния
export const executeRequest = async (dispatch, actionHolder, attribute, state) => {
    const action = actionHolder.action;
    console.log("ACTION", action);
    switch (action) {
        case Actions.SELECT: {
            // FIXME: временная заглушка disabled, чтобы не открывать неготовые экраны
            if (attribute.type === Attributes.MENU_ITEM
                && AttributeHelper.isNotDisabled(attribute)) {
                getScreen(attribute.value, dispatch);
            }
            return;
        }

        case Requests.BACK: {
            navigator.pop();
            const prevScreen = navigator.tail();
            await getScreen(prevScreen, dispatch);
            return;
        }

        case Requests.LOAD: {
            const nowScreen = navigator.tail();
            console.log(nowScreen)
            // FIXME: для отладки возвращается константа, когда навигатор пустой
            const screen = nowScreen === undefined ? "SERVICE_MENU" : nowScreen;
            await getScreen(screen, dispatch);
            return;
        }

        case Actions.MULTISELECT: {
            const activeItem = actionHolder.items.find(item => item.active);
            const action = activeItem.action;
            await executeRequest(dispatch, {action}, attribute)
            return;
        }

        case Requests.OPEN: {
            const endpoint = `screen?screen_name=${attribute.openOnEdit}&id=${attribute[attribute.fieldName]}`;
            console.log(endpoint);
            API.getExistedScreen(endpoint)
                .then()
            // открытие страницы с существующим эл-том
            return;
        }

        case Requests.DELETE: {

            // удаление выбранного элемента
            return;
        }

        case Requests.CREATE: {
            getScreen(attribute.openOnCreate, dispatch);
            // создание нового эл-та == переход на страницу
            return;
        }

        case Requests.SAVE: {
            // TODO: Здесь будет отправляться запрос на сохранение
            API.saveScreen(convertState(state))
                .then(() => {
                    {
                        // TODO: Возможно логику по возврату к предыдущей странице нужно поместить где-то в другом месте?
                        navigator.pop();
                        const prevScreen = navigator.tail();
                        getScreen(prevScreen, dispatch);
                    }
                })

            return;
        }
        default: {
            dispatch({type: action, payload: attribute});
            return;
        }
    }
}

const getScreen = async (prevScreen, dispatch) => {
    const response = await API.getScreen(prevScreen);
    const data = response.data;

    const attributes = data.attributes;
    const dictionaries = Object.keys(attributes)
        .filter(name => attributes[name].type === Attributes.DICTIONARY);

    console.log(dictionaries);
    for (let dictionaryName of dictionaries) {
        console.log(dictionaryName);
        await fillDictionary(attributes[dictionaryName]);
    }
    navigator.push(data.name);

    dispatch({type: Actions.INIT, payload: data});
}

const fillDictionary = async (emptyDictionary) => {
    const response = await API.getDictionary(
        emptyDictionary.dictionaryType,
        emptyDictionary.noCache
    );
    emptyDictionary.dictionaryValues = response.data.dictionaryValues;
}