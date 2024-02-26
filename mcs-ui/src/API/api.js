import axios from "axios";
import {dictionaryCache} from "../core/store/dictionary_cache";

const MOCK_REMOTE_URL = "https://056f0a88-8d8e-4a2b-b6a5-8f196f1bee39.mock.pstmn.io";
const LOCAL_PY_URL = "http://localhost:8080";
const MOCK_LOCAL_URL = "http://localhost:3000";

const MOCK_LOCAL_MODE = "MOCK_LOCAL";
const MOCK_REMOTE = "MOCK_REMOTE";
const LOCAL_PY_MODE = "LOCAL_PY";

const NOW_MODE = LOCAL_PY_MODE

const token = "e88fbc08-844f-46e7-b9f1-ebd3f59e1790"

const config = {
    headers: {Authorization: `Bearer ${token}`}
}

const WARNING = "Отсутствует заглушка"

const endpoints = {
    getDictionary: {
        [LOCAL_PY_MODE]: (dictionaryType, sessionId) => {
            return axios.get(`${LOCAL_PY_URL}/dictionary?dictionary_type=${dictionaryType}&session_id=${sessionId}`, config)
        },
        [MOCK_LOCAL_MODE]: (dictionaryType, sessionId) => {
            return axios.get(`${MOCK_LOCAL_URL}/dictionary/${dictionaryType}/dictionary.json`, config)
        }
    },
    getScreen: {
        [LOCAL_PY_MODE]: (screenName, sessionId, id) => {
            return axios.get(`${LOCAL_PY_URL}/screen?screen_name=${screenName}&session_id=${sessionId}&element_id=${id}`, config)
        },
        [MOCK_LOCAL_MODE]: (screenName, sessionId, id) => {
            return axios.get(`${MOCK_LOCAL_URL}/screen/${screenName}/screen.json`, config)
        }
    },
    saveScreen: {
        [LOCAL_PY_MODE]: (body, sessionId) => {
            return axios.post(`${LOCAL_PY_URL}/screen?session_id=${sessionId}`, body, config)
        },
        [MOCK_LOCAL_MODE]: (body, sessionId) => {
            console.log(body)
            console.log(sessionId)
        }
    },
    getExistedScreen: {
        [LOCAL_PY_MODE]: endpoint => axios.get(`${LOCAL_PY_URL}/${endpoint}`, config),
        [MOCK_LOCAL_MODE]: endpoint => console.log(endpoint)
    },
    getSessions: {
        [LOCAL_PY_MODE]: endpoint => axios.get(`${LOCAL_PY_URL}/sessions`, config),
        [MOCK_LOCAL_MODE]: endpoint => console.error(WARNING)
    },
    createSession: {
        [LOCAL_PY_MODE]: endpoint => axios.post(`${LOCAL_PY_URL}/session`, {}, config),
        [MOCK_LOCAL_MODE]: endpoint => console.error(WARNING),
    }
}

export default class API {

    static async getScreen(screenName, sessionId, id) {
        const rs = await endpoints.getScreen[NOW_MODE](screenName, sessionId, id);
        console.log(rs)
        return rs;
    }

    static async getExistedScreen(endpoint) {
        const rs = await endpoints.getExistedScreen[NOW_MODE](endpoint);
        console.log(rs)
        return rs;
    }


    static async getDictionary(dictionaryType, noCache, sessionId) {
        if (noCache === true) {
            const rs = await endpoints.getDictionary[MOCK_LOCAL_MODE](dictionaryType, sessionId);
            console.log(rs);
            return rs;
        } else if (!dictionaryCache.contains(dictionaryType)) {
            const rs = await endpoints.getDictionary[MOCK_LOCAL_MODE](dictionaryType, sessionId);
            console.log("Кладем", dictionaryType, " в кеш");
            dictionaryCache.put(dictionaryType, rs.data);
            console.log(rs);
            return rs;
        } else {
            console.log('Нашли', dictionaryType, 'в кеше');
            const data = dictionaryCache.get(dictionaryType);
            console.log({data})
            return {data};
        }
    }

    static async getSessions() {
        const rs = await endpoints.getSessions[LOCAL_PY_MODE]();
        console.log(rs);
        return rs.data;
    }

    static async createSession() {
        const rs = await endpoints.createSession[LOCAL_PY_MODE]();
        console.log(rs);
        return rs.data;
    }

    static async saveScreen(screen, sessionId) {
        console.log(screen);
        const rs = await endpoints.saveScreen[NOW_MODE](screen, sessionId);
        console.log(rs);
    }
}

