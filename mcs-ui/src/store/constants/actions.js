export default class Actions {
    // Инициализация состояния
    static INIT = "INIT";

    // Обновление атрибута
    static UPDATE_ATTRIBUTE = "UPDATE_ATTRIBUTE";

    // Выбор следующего атрибута кнопкой "Вверх"
    static UP = "UP";

    // Выбор следующего атрибута кнопкой "Вниз"
    static DOWN = "DOWN";

    // Нажатие на кнопку "Выбрать"
    static SELECT = "SELECT";

    // Стереть символ текстового поля
    static ERASE = "ERASE";

    // Изменить значение чекбокса на противоложное
    static EDIT = "EDIT";

    // Нажатие на кнопку "Назад"
    static BACK = "BACK";

    // Загрузка экрана
    static LOAD = "LOAD";

    // Сохранение экрана
    static SAVE = "SAVE";

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

    // Открыть экран
    static OPEN = "OPEN";

    // Добавить / создать новый
    static CREATE = "CREATE";

    // Удалить
    static DELETE = "DELETE";
}