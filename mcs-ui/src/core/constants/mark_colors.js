export class MarkColors {
    static FIVE = "#D6F2AC"
    static FOUR = "#F1F2AC"
    static THREE = "#F2C9AC"
    static TWO = "#F2ACAC"
    static UNDEFINED = "#D5D5D5"

    static _colors = {
        5: MarkColors.FIVE,
        4: MarkColors.FOUR,
        3: MarkColors.THREE,
        2: MarkColors.TWO,
    }

    static of(value) {
        const color = MarkColors._colors[value];
        if (!color) {
            return this.UNDEFINED
        }
        return color;
    }
}