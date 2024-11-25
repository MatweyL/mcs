import Actions from "../../constants/actions";

const defaultState = {
    refreshTimetable: ''
}

export const eventReducer = (state = defaultState, action) => {
    console.log(`User Reducer process - ${action.type}`);
    switch (action.type) {
        case Actions.TASKS_ISSUED: {
            return {refreshTimetable: new Date().getTime()};
        }
    }

    return state;
}