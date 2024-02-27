const DICTIONARY_CACHE = "dictionaryCache";

/**
 * Кеширование словарей
 */
class DictionaryCache {
    contains(dictionaryType) {
        let cached = this.get(dictionaryType);
        return cached !== null
            && cached !== undefined;
    }

    put(dictionaryType, data) {
        let cache = JSON.parse(localStorage.getItem(DICTIONARY_CACHE));
        if (cache === null) {
            cache = {};
        }
        cache[dictionaryType] = data;
        localStorage.setItem(DICTIONARY_CACHE, JSON.stringify(cache));
    }

    get(dictionaryType) {
        let cache = JSON.parse(localStorage.getItem(DICTIONARY_CACHE));
        if (cache === null) {
            return null;
        }
        return cache[dictionaryType];
    }
}

export const dictionaryCache = new DictionaryCache();