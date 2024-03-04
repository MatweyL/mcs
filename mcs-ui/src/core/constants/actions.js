export default class Actions {
    // Инициализация состояния
    static INIT = "INIT";

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

    // Загрузить список сессий
    static LOAD_SESSIONS = "LOAD_SESSIONS";

    // Открыть экран сессии
    static OPEN_SCREEN_SESSION = "OPEN_SCREEN_SESSION"

    // Начать сессию
    static START_SESSION = "START_SESSION"

    // Завершить сессию
    static FINISH_SESSION = "FINISH_SESSION"

    // Аутентифицировать пользователя
    static AUTHENTICATE = "AUTHENTICATE"

    // Выйти из профиля
    static LOGOUT = "LOGOUT";

    // Загрузить информацию по пользователю
    static LOAD_USER_INFO = "LOAD_USER_INFO";
}