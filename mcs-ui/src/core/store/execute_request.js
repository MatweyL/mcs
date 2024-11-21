import Requests from "../constants/requests";
import {cacheService, screenService} from "../di";
import Actions from "../constants/actions";
import Attributes from "../constants/attributes";
import {navigator} from "./screen/navigator";
import API from "../../API/api";
import {AuthStatus} from "../constants/auth_statuses";
import {CacheKeys} from "./cache_service";

const FIRST_SCREEN = "MAIN_SCREEN";

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

        case Requests.OPEN_SPECIFIC_SCREEN: {
            console.log('OPEN_SPECIFIC_SCREEN');
            const {buttonPayload, sessionId} = request.payload;

            console.log(request.payload);

            const screenRs = await screenService.getScreen(buttonPayload, sessionId);
            dispatch({type: Actions.INIT, payload: screenRs});
            return;
        }

        case Requests.LOAD: {
            let {sessionId} = request.payload
            const nowScreen = navigator.tail();

            // FIXME: для отладки возвращается константа, когда навигатор пустой
            const screen = nowScreen === undefined ? FIRST_SCREEN : nowScreen;
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
            const {session} = request.payload;
            const createdSession = await API.createSession(session);
            const sessionListRs = await API.getSessions();
            dispatch({type: Actions.LOAD_SESSIONS, payload: sessionListRs});
            return;
        }

        case Requests.CLOSE_SCREEN_SESSION: {
            navigator.clear();
            cacheService.removeAll([CacheKeys.SESSION_ID_KEY, CacheKeys.ELEMENT_ID_KEY])
            return;
        }

        case Requests.OPEN_SCREEN_SESSION: {
            const {sessionId} = request.payload;
            // FIXME: Перенес вызов выше, т.к. при вызове openScreenSession идет переход на страницу
            cacheService.put(CacheKeys.SESSION_ID_KEY, sessionId);
            // FIXME: вызывать getSessionById -> реализовать
            const sessionListRs = await API.getSessions();
            const nowSession = sessionListRs.sessions.find(session => session.uid === sessionId);
            console.log(nowSession);

            dispatch({type: Actions.OPEN_SCREEN_SESSION, payload: {sessionId, ...nowSession}})
            return;
        }

        case Requests.START_SESSION: {
            let {sessionId} = request.payload;
            if (!sessionId) {
                sessionId = cacheService.get(CacheKeys.SESSION_ID_KEY);
            }
            const result = await API.startSession(sessionId);
            dispatch({type: Actions.START_SESSION, payload: result});
            return;
        }

        case Requests.FINISH_SESSION: {
            let {sessionId} = request.payload;
            if (!sessionId) {
                sessionId = cacheService.get(CacheKeys.SESSION_ID_KEY);
            }
            const result = await API.finishSession(sessionId);
            dispatch({type: Actions.FINISH_SESSION, payload: result});
            return;
        }

        // открытие страницы с существующим эл-том
        case Requests.OPEN: {
            const {attribute, sessionId} = request.payload;
            const screen = attribute.openOnEdit;
            const id = attribute[attribute.fieldName];
            cacheService.put(CacheKeys.ELEMENT_ID_KEY, id);

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
            const {value} = request.payload;
            const result = await API.authenticate({uid: value})

            dispatch({type: Actions.LOAD_USER_INFO, payload: result});
            return;
        }

        // вход
        case Requests.LOGIN: {
            const {value, password} = request.payload;
            const result = await API.login({uid: value, password})
            if (result.status === AuthStatus.AUTHENTICATED) {
                cacheService.put(CacheKeys.TOKEN_KEY, result.token);
            }
            dispatch({type: Actions.LOAD_USER_INFO, payload: result});
            return;
        }

        // выход из профиля
        case Requests.LOGOUT: {
            cacheService.removeAll([CacheKeys.TOKEN_KEY, CacheKeys.ELEMENT_ID_KEY, CacheKeys.SESSION_ID_KEY])
            navigator.clear();
            dispatch({type: Actions.LOGOUT});
            return;
        }

        // загрузить подсказки
        case Requests.REQUEST_HINT: {
            let {sessionId, screenName} = request.payload;
            if (!sessionId) {
                sessionId = cacheService.get(CacheKeys.SESSION_ID_KEY);
            }

            const hint = await API.validateTrainingSession(sessionId, screenName);
            dispatch({type: Actions.UPDATE_HINT, payload: hint});
            return;
        }

        // получить описание задачи
        case Requests.REQUEST_TASK: {
            let {sessionId} = request.payload;

            const rs = await API.requestTask(sessionId);
            return;
        }

        // выдать задачи
        case Requests.ISSUE_TASKS: {
            let {variants, training, group} = request.payload;

            const rs = await API.issueTasks(variants, training, group);
            return;
        }
    }
}