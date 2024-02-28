import Requests from "../constants/requests";
import {screenService, userService} from "../di";
import Actions from "../constants/actions";
import Attributes from "../constants/attributes";
import {navigator} from "./screen/navigator";
import API from "../../API/api";
import {AuthStatus} from "../constants/auth_statuses";

export const executeRequest = async (dispatch, request) => {
    console.log(`Execute request - ${request.type}`);
    switch (request.type) {
        case Requests.BACK: {
            const {sessionId} = request.payload;
            navigator.pop();
            const prevScreen = navigator.tail();
            const screenRs = await screenService.getScreen(prevScreen, sessionId);
            dispatch({type: Actions.INIT, payload: screenRs});
            return;
        }

        case Requests.SELECT: {
            const {attribute, sessionId} = request.payload;
            if (attribute.type !== Attributes.MENU_ITEM || !attribute.value) {
                return;
            }
            const screenRs = await screenService.getScreen(attribute.value, sessionId);
            dispatch({type: Actions.INIT, payload: screenRs});
            return;
        }

        case Requests.LOAD: {
            const {sessionId} = request.payload
            const nowScreen = navigator.tail();

            // FIXME: для отладки возвращается константа, когда навигатор пустой
            const screen = nowScreen === undefined ? "MAIN_MENU" : nowScreen;
            const screenRs = await screenService.getScreen(screen, sessionId);
            dispatch({type: Actions.INIT, payload: screenRs});
            return;
        }

        case Requests.SAVE: {
            const {state, sessionId} = request.payload;
            await screenService.saveScreen(state, sessionId);

            navigator.pop();
            const prevScreen = navigator.tail();
            const screenRs = await screenService.getScreen(prevScreen, sessionId);
            dispatch({type: Actions.INIT, payload: screenRs});
            return;
        }

        case Requests.GET_SESSIONS: {
            const sessionListRs = await API.getSessions();
            dispatch({type: Actions.LOAD_SESSIONS, payload: sessionListRs});
            return;
        }

        case Requests.CREATE_SESSION: {
            const createdSession = await API.createSession();
            const sessionListRs = await API.getSessions();
            dispatch({type: Actions.LOAD_SESSIONS, payload: sessionListRs});
            return;
        }

        case Requests.CLOSE_SCREEN_SESSION: {
            navigator.clear();
            return;
        }

        // открытие страницы с существующим эл-том
        case Requests.OPEN: {
            const {attribute, sessionId} = request.payload;
            const screen = attribute.openOnEdit;
            const id = attribute[attribute.fieldName];
            const screenRs = await screenService.getScreen(screen, sessionId, id);
            dispatch({type: Actions.INIT, payload: screenRs});
            return;
        }

        // удаление выбранного элемента
        case Requests.DELETE: {
            const {attribute, sessionId} = request.payload;
            console.log(attribute)
            return;
        }

        // создание нового эл-та == переход на страницу
        case Requests.CREATE: {
            const {attribute, sessionId} = request.payload;
            console.log(attribute)
            const screen = attribute.openOnCreate;
            const screenRs = await screenService.getScreen(screen, sessionId);
            dispatch({type: Actions.INIT, payload: screenRs});
            return;
        }

        // аутентификация пользователя
        case Requests.AUTHENTICATE: {
            const {value, password} = request.payload;
            const result = await API.authenticate({uid: value, password})
            if (result.status === AuthStatus.AUTHENTICATED) {
                await userService.saveToken(result.token);
            }
            dispatch({type: Actions.AUTHENTICATE, payload: result});
            return;
        }
    }
}