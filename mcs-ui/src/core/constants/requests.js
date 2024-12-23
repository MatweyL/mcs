export default class Requests {
    // Открыть экран
    static OPEN = "OPEN";

    // Открыть конкретный экран
    static OPEN_SPECIFIC_SCREEN = "OPEN_SPECIFIC_SCREEN";

    // Загрузка экрана
    static LOAD = "LOAD";

    // Нажатие на кнопку "Назад"
    static BACK = "BACK";

    // Сохранение экрана
    static SAVE = "SAVE";

    // Добавить / создать новый
    static CREATE = "CREATE";

    // Удалить
    static DELETE = "DELETE";

    // Выбрать ???
    static SELECT = "SELECT"

    // Получить сессии
    static GET_SESSIONS = "GET_SESSIONS";

    // Создать сессию
    static CREATE_SESSION = "CREATE_SESSION";

    // Закрыть сессию
    static CLOSE_SCREEN_SESSION = "CLOSE_SCREEN_SESSION";

    // Открыть сессию
    static OPEN_SCREEN_SESSION = "OPEN_SCREEN_SESSION";

    // Начать сессию
    static START_SESSION = "START_SESSION"

    // Завершить сессию
    static FINISH_SESSION = "FINISH_SESSION"

    // Аутентифицировать пользователя
    static AUTHENTICATE = "AUTHENTICATE";

    // Войти
    static LOGIN = "LOGIN";

    // Выйти
    static LOGOUT = "LOGOUT";

    // Запросить подсказку для пользователя
    static REQUEST_HINT = "REQUEST_HINT";

    // Выдать задачи студентам
    static ISSUE_TASKS = "ISSUE_TASKS";
}