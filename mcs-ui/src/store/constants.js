//////////////////
//// Действия ////
//////////////////

/// Инициализация состояния
export const INIT = "INIT";

/// Обновление атрибута
export const UPDATE_ATTRIBUTE = "UPDATE_ATTRIBUTE";

/// Выбор следующего атрибута кнопкой "Вверх"
export const UP = "UP";

/// Выбор следующего атрибута кнопкой "Вниз"
export const DOWN = "DOWN";

/// Нажатие на кнопку "Выбрать"
export const SELECT = "SELECT";

/// Стереть символ текстового поля
export const ERASE = "ERASE";

/// Изменить значение чекбокса на противоложное
export const EDIT = "EDIT";

/// Нажатие на кнопку "Назад"

export const BACK = "BACK";

/// Загрузка экрана
export const LOAD = "LOAD";

/// Сохранение экрана
export const SAVE = "SAVE";

/// Открыть меню
export const OPEN_MENU = "OPEN_MENU";

/// Закрыть меню
export const CLOSE_MENU = "CLOSE_MENU";

/// Раскрыть селект-бокс
export const OPEN_SELECT_BOX = "OPEN_SELECT_BOX";

/// Закрыть селект-бокс
export const CLOSE_SELECT_BOX = "CLOSE_SELECT_BOX";

/// Сохранить в форму значение, выбранное через SELECT_BOX
export const SAVE_SELECTED = "SAVE_SELECTED"

/// Выбрать из пунктов
export const MULTISELECT = "MULTISELECT";

/// Открыть экран
export const OPEN = "OPEN";

/// Добавить / создать новый
export const CREATE = "CREATE";

/// Удалить
export const DELETE = "DELETE";

//////////////////
//// Атрибуты ////
//////////////////

/// Текстовое поле
export const TEXT = "TEXT";

/// Чек-бокс
export const BOOLEAN = "BOOLEAN";
export const CHECKBOX = BOOLEAN;

/// Словарь / Бокс с множественным выбором
export const DICTIONARY = "DICTIONARY";
export const SELECT_BOX = DICTIONARY;

/// Элемент меню
export const MENU_ITEM = "MENU_ITEM";

/// Карточка объекта
export const CARD_ITEM = "CARD_ITEM";