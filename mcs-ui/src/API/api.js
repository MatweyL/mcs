import axios from "axios";
import {dictionaryCache} from "../store/dictionarycache";

const URL = "https://056f0a88-8d8e-4a2b-b6a5-8f196f1bee39.mock.pstmn.io";
const MOCK_URL = "http://localhost:3000";

const ENABLE_MOCK = true;

const endpoints = {
   dictionary: {
        [false]: dictionaryType =>   axios.get(`${URL}/dictionary/${dictionaryType}`,),
        [true]: dictionaryType =>  axios.get(`${MOCK_URL}/dictionary/${dictionaryType}/dictionary.json`)
    },
    screen: {
        [false]: screenName => axios.get(`${URL}/screen/${screenName}`,),
        [true]: screenName => axios.get(`${MOCK_URL}/screen/${screenName}/screen.json`)
    }
}

export default class API {

    static async getScreen(screenName) {
        const rs = await endpoints.screen[ENABLE_MOCK](screenName);
        console.log(rs)
        return rs;
    }

    static async getDictionary(dictionaryType, noCache) {
        if (noCache === true) {
            const rs = await endpoints.dictionary[ENABLE_MOCK](dictionaryType);
            console.log(rs);
            return rs;
        } else if (!dictionaryCache.contains(dictionaryType)) {
            const rs = await endpoints.dictionary[ENABLE_MOCK](dictionaryType);
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

    static async saveScreen(screen) {
        console.log(screen);
    }
}

