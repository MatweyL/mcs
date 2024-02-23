export default class Attributes {
    // Текстовое поле
    static TEXT = "TEXT";

    // Чек-бокс
    static BOOLEAN = "BOOLEAN";
    static CHECKBOX = this.BOOLEAN;

    // Словарь / Бокс с множественным выбором
    static DICTIONARY = "DICTIONARY";
    static SELECT_BOX = this.DICTIONARY;

    /// Элемент меню
    static MENU_ITEM = "MENU_ITEM";

    /// Карточка объекта
    static CARD_ITEM = "CARD_ITEM";

    static _height = {
        [this.TEXT]: 25,
        [this.BOOLEAN]: 25,
        [this.DICTIONARY]: 25,
        [this.MENU_ITEM]: 26.4,
        [this.CARD_ITEM]: 25,
        [this.UUID]: 0,
    }

    static heightOf(type) {
        const height = this._height[type];
        if (!height) {
            throw new Error(`Неизвестный тип - ${type}`);
        }
        return height;
    }
}