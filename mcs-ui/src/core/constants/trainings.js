// TODO: 11.11.2024 надо получать справочником с BE
/**
 * Возможные УТК (учебно-тренировочные комплексы)
 */
export default class Trainings {
    static UTK1 = "UTK1";
    static UTK2 = "UTK2";
    static UTK3 = "UTK3";
    static UTK4 = "UTK4";

    static VALUES = [
        {value: "", label: ""},
        {value: Trainings.UTK1, label: "УТК-1. Включение питания"},
        {value: Trainings.UTK2, label: "УТК-2. Настройка частоты в режиме ЧМ25"},
        {value: Trainings.UTK3, label: "УТК-3. Настройка частоты в режиме ЧМ50"},
        {value: Trainings.UTK4, label: "УТК-4. Настройка частоты в режиме ППРЧ"},
    ]

    static getLabel = (value) => {
        return Trainings.VALUES
            .find(training => training.value === value)
            .label
    }
}