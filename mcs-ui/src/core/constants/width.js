export default class Width {
    static FULL = "FULL"
    static THIRD = "THIRD"

    static DEFAULT = "DEFAULT"

    static map = {
        [this.FULL]: "100%",
        [this.THIRD]: "70px",
        [this.DEFAULT]: "120px"
    }

    static of(width) {
        const value = this.map[width];
        if (value) {
            return value;
        }
        return this.map[this.DEFAULT];
    }
}