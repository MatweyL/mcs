/**
 * Класс-селектор
 */
export class Selector {
    /**
     * Выбрать атрибут
     *
     * @param state состояние
     * @param name название текущего выбранного атрибута
     * @param direction направление
     */
    select(state, name, direction) {}

    /**
     * Должен ли вызываться метод select()
     *
     * @param state состояние
     * @param name название текущего выбранного атрибута
     */
    shouldCall(state, name) {}
}