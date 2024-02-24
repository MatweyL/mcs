/**
 * Иконки
 */
export class Icons {
    static GEAR = "GEAR";
    static MAP = "MAP";
    static MESSAGES = "MESSAGES";
    static BATTERY = "BATTERY";

    static _sources = {
        [Icons.GEAR]: "/menu-icons/Gears.svg",
        [Icons.MAP]: "/menu-icons/Map.svg",
        [Icons.MESSAGES]: "/menu-icons/Messages.svg",
        [Icons.BATTERY]: "/menu-icons/Battery.svg",
    }

    static of(icon) {
        const source = Icons._sources[icon];
        if (!source) {
            throw new Error(`Неизвестный тип иконки - ${icon}`);
        }
        return source;
    }
}