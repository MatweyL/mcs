export default class Actions {
    // TODO: Возможно эти 4 действия - INIT, OPEN, LOAD, SELECT означают одно и то же
    // Инициализация состояния
    static INIT = "INIT";

    // Нажатие на кнопку "Выбрать"
    static SELECT = "SELECT";

    // Обновление атрибута
    static UPDATE_ATTRIBUTE = "UPDATE_ATTRIBUTE";

    // Выбор следующего атрибута кнопкой "Вверх"
    static UP = "UP";

    // Выбор следующего атрибута кнопкой "Вниз"
    static DOWN = "DOWN";

    // Стереть символ текстового поля
    static ERASE = "ERASE";

    // Изменить значение чекбокса на противоложное
    static EDIT = "EDIT";

    // Открыть меню
    static OPEN_MENU = "OPEN_MENU";

    // Закрыть меню
    static CLOSE_MENU = "CLOSE_MENU";

    // Раскрыть селект-бокс
    static OPEN_SELECT_BOX = "OPEN_SELECT_BOX";

    // Закрыть селект-бокс
    static CLOSE_SELECT_BOX = "CLOSE_SELECT_BOX";

    // Сохранить в форму значение, выбранное через SELECT_BOX
    static SAVE_SELECTED = "SAVE_SELECTED"

    // Выбрать из пунктов
    static MULTISELECT = "MULTISELECT";

    // Ввод символа в текстовое поле
    static PRESS_KEY = "PRESS_KEY"
}