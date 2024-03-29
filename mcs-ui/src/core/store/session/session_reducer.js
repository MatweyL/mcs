import Actions from "../../constants/actions";
import {SessionTypes} from "../../constants/session_types";

const defaultSessionState = {
    sessionId: null,
    trainingResult: null,
    type: SessionTypes.TRAINING
}

export const sessionReducer = (state = defaultSessionState, action) => {
    console.log(`Session Reducer process - ${action.type}`);
    switch (action.type) {
        case Actions.OPEN_SCREEN_SESSION: {
            const {sessionId} = action.payload;
            return {sessionId};
        }

        case Actions.FINISH_SESSION: {
            const {training_result} = action.payload;
            return {...state, trainingResult: {...training_result}};
        }

        case Actions.START_SESSION: {
            console.log(action.payload);
            return {...state};
        }
    }

    return state;
}