
export class CacheKeys {
    static SESSION_ID_KEY = "SESSION_ID";
    static ELEMENT_ID_KEY = "ELEMENT_ID";
    static TOKEN_KEY = 'TOKEN'

}

// TODO: подумать о том, чтобы объединить с UserService
/**
 * Сервис для кэширования данных при перезагрузке страницы
 */
export class CacheService {
    get(key) {
        return localStorage.getItem(key);
    }

    remove(key) {
        localStorage.removeItem(key);
    }

    removeAll(keys) {
        for (const key of keys) {
            this.remove(key);
        }
    }

    put(key, value) {
        localStorage.setItem(key, value);
    }
}