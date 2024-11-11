export class MarkColors {
    static FIVE = "#D6F2AC"
    static FOUR = "#F1F2AC"
    static THREE = "#F2C9AC"
    static TWO = "#F2ACAC"

    static _colors = {
        5: MarkColors.FIVE,
        4: MarkColors.FOUR,
        3: MarkColors.THREE,
        2: MarkColors.TWO,
    }

    static of(value) {
        const color = MarkColors._colors[value];
        if (!color) {
            throw new Error(`Неизвестное значение для цвета оценки - ${value}`);
        }
        return color;
    }
}