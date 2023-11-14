import axios from "axios";

const URL = "https://056f0a88-8d8e-4a2b-b6a5-8f196f1bee39.mock.pstmn.io";
const MOCK_URL = "http://localhost:3000";

const ENABLE_MOCK = true;

export default class API {

    static async getScreen(screenName) {
        return ENABLE_MOCK
            ? this._getScreenMock(screenName)
            : this._getScreenReal(screenName);
    }

    static async _getScreenReal(screenName) {
        const rs = await axios.get(`${URL}/screen/${screenName}`,);
        console.log(rs)
        return rs;
    }

    static async _getScreenMock(screenName) {
        const rs = await axios.get(`${MOCK_URL}/screen/${screenName}/screen.json`)
        console.log(rs)
        return rs;
    }

    static async getDictionary(dictionaryType) {
        return ENABLE_MOCK
            ? this._getDictionaryMock(dictionaryType)
            : this._getDictionaryReal(dictionaryType);
    }

    static async _getDictionaryReal(dictionaryType) {
        const rs = await axios.get(`${URL}/dictionary/${dictionaryType}`,);
        console.log(rs)
        return rs;
    }

    static async _getDictionaryMock(dictionaryType) {
        const rs = await axios.get(`${MOCK_URL}/dictionary/${dictionaryType}/dictionary.json`,);
        console.log(rs)
        return rs;
    }
}