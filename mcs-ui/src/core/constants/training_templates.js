import Trainings from "./trainings";

export class TrainingTemplates {
    static VALUES = {
        [Trainings.UTK1]: [
            {"label": "Частота, МГц", "name": "frequency"},
            {"label": "Название канала", "name": "channel_name"},
        ],
        [Trainings.UTK2]: [
            {"label": "Частота, МГц", "name": "frequency"},
            {"label": "Название канала", "name": "channel_name"},
            {"label": "Название направление", "name": "direction_name"},
        ],
        [Trainings.UTK3]: [
            {"label": "Частота, МГц", "name": "frequency"},
            {"label": "Название канала", "name": "channel_name"},
        ],
        [Trainings.UTK4]: [
            {"label": "Частота, МГц", "name": "frequency"}
        ]
    }
}