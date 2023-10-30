import axios from "axios";

const URL = "https://056f0a88-8d8e-4a2b-b6a5-8f196f1bee39.mock.pstmn.io";

export default class API {

    static async getScreen(screenName) {
        const rs = await axios.get(`${URL}/screen/${screenName}`,);
        console.log(rs)
        return rs;
    }

    static async getDictionary(dictionaryType) {
        const rs = await axios.get(`${URL}/dictionary/${dictionaryType}`,);
        console.log(rs)
        return rs;
    }
}