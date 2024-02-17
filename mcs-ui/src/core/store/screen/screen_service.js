import API from "../../../API/api";
import Attributes from "../../constants/attributes";
import {navigator} from "./navigator";
import {convertState} from "../util";

export class ScreenService {
    async getScreen(screenName, sessionId, id) {
        const response = await API.getScreen(screenName, sessionId, id);
        const data = response.data;

        const attributes = data.attributes;
        const dictionaries = Object.keys(attributes)
            .filter(name => attributes[name].type === Attributes.DICTIONARY);

        console.log(dictionaries);
        for (let dictionaryName of dictionaries) {
            console.log(dictionaryName);
            await this.fillDictionary(attributes[dictionaryName]);
        }
        navigator.push(data.name);

        return data;
    }

    async fillDictionary(emptyDictionary) {
        const response = await API.getDictionary(
            emptyDictionary.dictionaryType,
            emptyDictionary.noCache
        );
        emptyDictionary.dictionaryValues = response.data.dictionaryValues;
    }

    async saveScreen(state, sessionId) {
        await API.saveScreen(convertState(state), sessionId);
    }
}