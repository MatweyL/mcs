import Actions from "../../constants/actions";

const defaultSessionState = [
    {title: "Сеанс - УТК-1", date: "12/11/2023 14:15", uid: '1'},
    {title: "Сеанс - УТК-2", date: "12/11/2023 14:15", uid: '2'},
    {title: "Сеанс - УТК-2", date: "12/11/2023 14:15", uid: '3'},
    {title: "Сеанс - УТК-3", date: "12/11/2023 14:15", uid: '4'},
    {title: "Сеанс - УТК-4", date: "12/11/2023 14:15", uid: '5'},
    {title: "Сеанс - УТК-4", date: "12/11/2023 14:15", uid: '6'},
]

export const sessionReducer = (state = [], action) => {
    console.log(`Session Reducer process - ${action.type}`);
    switch (action.type) {
        case Actions.LOAD_SESSIONS: {
            const payload = action.payload;
            return payload.sessions;
        }
    }

    return state;
}