import API from "../../../API/api";
import Attributes from "../../constants/attributes";
import {navigator} from "./navigator";
import {convertState} from "../util";
import {cacheService} from "../../di";
import {CacheKeys} from "../cache_service";

export class ScreenService {
    async getScreen(screenName, sessionId, id) {
        if (!sessionId) {
            sessionId = cacheService.get(CacheKeys.SESSION_ID_KEY);
        }

        if (!id) {
            id = cacheService.get(CacheKeys.ELEMENT_ID_KEY);
        }

        const response = await API.getScreen(screenName, sessionId, id);
        const data = response.data;

        const attributes = data.attributes;
        const dictionaries = Object.keys(attributes)
            .filter(name => attributes[name].type === Attributes.DICTIONARY);

        console.log(dictionaries);
        for (let dictionaryName of dictionaries) {
            console.log(dictionaryName);
            await this.fillDictionary(attributes[dictionaryName], sessionId);
        }
        navigator.push(data.name);

        return data;
    }

    async fillDictionary(emptyDictionary, sessionId) {
        const response = await API.getDictionary(
            emptyDictionary.dictionaryType,
            emptyDictionary.noCache,
            sessionId
        );
        emptyDictionary.dictionaryValues = response.data.dictionaryValues;
    }

    async saveScreen(state, sessionId) {
        if (!sessionId) {
            sessionId = cacheService.get(CacheKeys.SESSION_ID_KEY);
        }

        await API.saveScreen(convertState(state), sessionId);
    }
}