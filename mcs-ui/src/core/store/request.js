import Requests from "../constants/requests";
import {screenService} from "../di";
import Actions from "../constants/actions";
import Attributes from "../constants/attributes";
import {navigator} from "./screen/navigator";
import API from "../../API/api";

export const executeRequest = async (dispatch, request) => {
    switch (request.type) {
        case Requests.BACK: {
            navigator.pop();
            const prevScreen = navigator.tail();
            const screenRs = await screenService.getScreen(prevScreen);
            dispatch({type: Actions.INIT, payload: screenRs});
            return;
        }

        case Requests.SELECT: {
            const {attribute} = request.payload;
            if (attribute.type !== Attributes.MENU_ITEM) {
                return;
            }
            const screenRs = await screenService.getScreen(attribute.value);
            dispatch({type: Actions.INIT, payload: screenRs});
            return;
        }

        case Requests.LOAD: {
            const nowScreen = navigator.tail();

            // FIXME: для отладки возвращается константа, когда навигатор пустой
            const screen = nowScreen === undefined ? "SERVICE_MENU" : nowScreen;
            const screenRs = await screenService.getScreen(screen);
            dispatch({type: Actions.INIT, payload: screenRs});
            return;
        }

        case Requests.SAVE: {
            const {state} = request.payload;
            await screenService.saveScreen(state);

            navigator.pop();
            const prevScreen = navigator.tail();
            const screenRs = await screenService.getScreen(prevScreen);
            dispatch({type: Actions.INIT, payload: screenRs});
            return;
        }

        case Requests.GET_SESSIONS: {
            const sessionListRs = await API.getSessions();
            dispatch({type: Actions.LOAD_SESSIONS, payload: sessionListRs});
        }

        case Requests.OPEN: {
            // открытие страницы с существующим эл-том
            return;
        }

        case Requests.DELETE: {
            // удаление выбранного элемента
            return;
        }

        case Requests.CREATE: {
            // создание нового эл-та == переход на страницу
            return;
        }
    }
}