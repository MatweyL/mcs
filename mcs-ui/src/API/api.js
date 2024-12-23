import axios from "axios";
import {dictionaryCache} from "../core/store/dictionary_cache";
import {cacheService} from "../core/di";
import {HINT} from "./api_helper";
import {CacheKeys} from "../core/store/cache_service";

const MOCK_REMOTE_URL = "https://056f0a88-8d8e-4a2b-b6a5-8f196f1bee39.mock.pstmn.io";
const LOCAL_PY_URL = process.env.REACT_APP_LOCAL_PY_URL;
const MOCK_LOCAL_URL = "https://localhost:3000";


const MOCK_LOCAL_MODE = "MOCK_LOCAL";
const MOCK_REMOTE = "MOCK_REMOTE";
const LOCAL_PY_MODE = "LOCAL_PY";

const NOW_MODE = LOCAL_PY_MODE

export const token = () => cacheService.get(CacheKeys.TOKEN_KEY);

const config = () => {
    return {headers: {Authorization: `Bearer ${token()}`}}
}

const WARNING = "Отсутствует заглушка"

const endpoints = {
    getDictionary: {
        [LOCAL_PY_MODE]: async (dictionaryType, sessionId) => {
            return axios.get(`${LOCAL_PY_URL}/dictionary?dictionary_type=${dictionaryType}&session_id=${sessionId}`, config())
        },
        [MOCK_LOCAL_MODE]: (dictionaryType, sessionId) => {
            return axios.get(`${MOCK_LOCAL_URL}/dictionary/${dictionaryType}/dictionary.json`, config())
        }
    },
    getScreen: {
        [LOCAL_PY_MODE]: async (screenName, sessionId, id) => {
            return axios.get(`${LOCAL_PY_URL}/screen?screen_name=${screenName}&session_id=${sessionId}&element_id=${id}`, config())
        },
        [MOCK_LOCAL_MODE]: (screenName, sessionId, id) => {
            return axios.get(`${MOCK_LOCAL_URL}/screen/${screenName}/screen.json`, config())
        }
    },
    removeScreenElement: {
        [LOCAL_PY_MODE]: async (screenName, sessionId, id) => {
            return axios.delete(`${LOCAL_PY_URL}/screen?screen_name=${screenName}&session_id=${sessionId}&element_id=${id}`, config())
        }
    },
    saveScreen: {
        [LOCAL_PY_MODE]: async (body, sessionId) => {
            return axios.post(`${LOCAL_PY_URL}/screen?session_id=${sessionId}`, body, config())
        },
        [MOCK_LOCAL_MODE]: (body, sessionId) => {
            console.log(body)
            console.log(sessionId)
        }
    },
    getExistedScreen: {
        [LOCAL_PY_MODE]: async endpoint => axios.get(`${LOCAL_PY_URL}/${endpoint}`, config()),
        [MOCK_LOCAL_MODE]: endpoint => console.log(endpoint)
    },
    getSessions: {
        [LOCAL_PY_MODE]: async endpoint => axios.get(`${LOCAL_PY_URL}/sessions`, config()),
        [MOCK_LOCAL_MODE]: endpoint => console.error(WARNING)
    },
    createSession: {
        [LOCAL_PY_MODE]: async session => axios.post(`${LOCAL_PY_URL}/session`, session, config()),
        [MOCK_LOCAL_MODE]: endpoint => console.error(WARNING),
    },
    startSession: {
        [LOCAL_PY_MODE]: async sessionId => axios.post(`${LOCAL_PY_URL}/session/start?session_uid=${sessionId}`, {}, config()),
        [MOCK_LOCAL_MODE]: endpoint => console.error(WARNING),
    },
    finishSession: {
        [LOCAL_PY_MODE]: async sessionId => axios.post(`${LOCAL_PY_URL}/session/finish?session_uid=${sessionId}`, {}, config()),
        [MOCK_LOCAL_MODE]: endpoint => console.error(WARNING),
    },
    getGroups: {
        [LOCAL_PY_MODE]: endpoint => axios.get(`${LOCAL_PY_URL}/groups`),
        [MOCK_LOCAL_MODE]: endpoint => console.error(WARNING),
    },
    getDevices: {
        [LOCAL_PY_MODE]: endpoint => axios.get(`${LOCAL_PY_URL}/devices`),
        [MOCK_LOCAL_MODE]: endpoint => console.error(WARNING),
    },
    getTrainingTypes: {
        [LOCAL_PY_MODE]: (device) => axios.get(`${LOCAL_PY_URL}/trainings?device=${device}`),
        [MOCK_LOCAL_MODE]: endpoint => console.error(WARNING),
    },
    getGroupTimetable: {
        [LOCAL_PY_MODE]: groupId => axios.get(`${LOCAL_PY_URL}/students/marks?group_uid=${groupId}`, config()),
        [MOCK_LOCAL_MODE]: groupId => axios.get(`${MOCK_LOCAL_URL}/mock-timetables/data-${groupId}.json`),
    },
    getTeachers: {
        [LOCAL_PY_MODE]: endpoint => axios.get(`${LOCAL_PY_URL}/teachers`),
        [MOCK_LOCAL_MODE]: endpoint => axios.get(`${MOCK_LOCAL_URL}/mock-teachers/data.json`),
    },
    getUsersByGroupId: {
        [LOCAL_PY_MODE]: groupId => axios.get(`${LOCAL_PY_URL}/users?group_uid=${groupId}`),
        [MOCK_LOCAL_MODE]: endpoint => console.error(WARNING),
    },
    authenticate: {
        [LOCAL_PY_MODE]: user => axios.post(`${LOCAL_PY_URL}/auth`, user),
        [MOCK_LOCAL_MODE]: endpoint => console.error(WARNING),
    },
    login: {
        [LOCAL_PY_MODE]: user => axios.post(`${LOCAL_PY_URL}/login`, user),
        [MOCK_LOCAL_MODE]: endpoint => console.error(WARNING),
    },
    validateTrainingSession: {
        [LOCAL_PY_MODE]: (sessionId, screenName) => {
            console.log("VALIDATE")
            return axios.get(`${LOCAL_PY_URL}/session/training/validate?session_uid=${sessionId}&screen_code=${screenName}`, config())
        },
        [MOCK_LOCAL_MODE]: (sessionId, screenName) => {
            const hintName = HINT[screenName];
            return axios.get(`${MOCK_LOCAL_URL}/hints/${hintName}`, config())
        }
    },
    getTaskDescription: {
        [LOCAL_PY_MODE]: (sessionId) => {
            return axios.get(`${LOCAL_PY_URL}/task/description?session_id=${sessionId}`, config())
        },
        [MOCK_LOCAL_MODE]: endpoint => console.error(WARNING),
    },
    getTaskTemplate: {
        [LOCAL_PY_MODE]: (training) => {
            return axios.get(`${LOCAL_PY_URL}/task/template?training_kind=${training}`, config())
        },
        [MOCK_LOCAL_MODE]: endpoint => console.error(WARNING),
    },
    issueTasks: {
        [LOCAL_PY_MODE]: (variants, training, group) => {
            return axios.post(`${LOCAL_PY_URL}/task/issue`, {variants, training, group_id: group}, config())
        },
        [MOCK_LOCAL_MODE]: endpoint => console.error(WARNING),
    }
}


export default class API {

    static async getScreen(screenName, sessionId, id) {
        const rs = await endpoints.getScreen[NOW_MODE](screenName, sessionId, id);
        console.log(rs)
        return rs;
    }

    static async createNewScreen(screenName, sessionId) {
        const rs = await endpoints.getScreen[NOW_MODE](screenName, sessionId);
        console.log(rs)
        return rs;
    }

    static async removeElementScreen(screenName, sessionId, id) {
        const rs = await endpoints.removeScreenElement[NOW_MODE](screenName, sessionId, id);
        console.log(rs)
        return rs;
    }

    static async getExistedScreen(endpoint) {
        const rs = await endpoints.getExistedScreen[NOW_MODE](endpoint);
        console.log(rs)
        return rs;
    }


    static async getDictionary(dictionaryType, noCache, sessionId) {
        console.log('getDictionary');
        console.log(dictionaryType);
        console.log(sessionId);
        if (noCache === true) {
            const rs = await endpoints.getDictionary[NOW_MODE](dictionaryType, sessionId);
            console.log(rs);
            return rs;
        } else if (!dictionaryCache.contains(dictionaryType)) {
            const rs = await endpoints.getDictionary[NOW_MODE](dictionaryType, sessionId);
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

    static async createSession(session) {
        const rs = await endpoints.createSession[LOCAL_PY_MODE](session);
        console.log(rs);
        return rs.data;
    }

    static async startSession(sessionId) {
        const rs = await endpoints.startSession[LOCAL_PY_MODE](sessionId);
        console.log(rs);
        return rs.data;
    }

    static async finishSession(sessionId) {
        const rs = await endpoints.finishSession[LOCAL_PY_MODE](sessionId);
        console.log(rs);
        return rs.data;
    }

    static async saveScreen(screen, sessionId) {
        console.log(screen);
        const rs = await endpoints.saveScreen[NOW_MODE](screen, sessionId);
        console.log(rs);
    }

    static async getGroups() {
        const rs = await endpoints.getGroups[NOW_MODE]();
        console.log(rs);
        return rs.data.groups;
    }

    static async getDevices() {
        const rs = await endpoints.getDevices[NOW_MODE]();
        console.log(rs);
        return rs.data.devices;
    }

    static async getTrainingTypes(device) {
        const rs = await endpoints.getTrainingTypes[NOW_MODE](device);
        console.log(rs);
        return rs.data.types;
    }

    static async getGroupTimetable(groupId) {
        const rs = await endpoints.getGroupTimetable[NOW_MODE](groupId);
        console.log(rs);
        return rs.data.timetable;
    }

    static async getTeachers() {
        const rs = await endpoints.getTeachers[MOCK_LOCAL_MODE]();
        console.log(rs);
        return rs.data.teachers;
    }

    static async getUsersByGroup(groupId) {
        console.log(groupId);
        const rs = await endpoints.getUsersByGroupId[NOW_MODE](groupId);
        console.log(rs);
        return rs.data.users;
    }

    static async authenticate(user) {
        console.log(user);
        const rs = await endpoints.authenticate[NOW_MODE](user);
        console.log(rs);
        return rs.data;
    }

    static async login(user) {
        console.log(user);
        const rs = await endpoints.login[NOW_MODE](user);
        console.log(rs);
        return rs.data;
    }

    static async validateTrainingSession(sessionId, screenName) {
        console.log(sessionId, screenName);
        const rs = await endpoints.validateTrainingSession[NOW_MODE](sessionId, screenName);
        console.log(rs);
        return rs.data;
    }

    static async getTaskDescription(sessionId) {
        console.log(sessionId);
        const rs = await endpoints.getTaskDescription[NOW_MODE](sessionId);
        console.log(rs);
        return rs.data;
    }

    static async getTaskTemplate(training) {
        const rs = await endpoints.getTaskTemplate[NOW_MODE](training);
        console.log(rs);
        return rs.data;
    }

    static async issueTasks(variants, training, group) {
        console.log(variants, training, group);
        const rs = await endpoints.issueTasks[NOW_MODE](variants, training, group);
        console.log(rs);
        return rs.data;
    }
}

