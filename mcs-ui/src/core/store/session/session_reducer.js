import Actions from "../../constants/actions";
import {SessionTypes} from "../../constants/session_types";
import {SessionStatus} from "../../constants/session_status";

const defaultSessionState = {
    sessionId: null,
    trainingResult: null,
    type: null,
    status: null,
    call: null
}

export const sessionReducer = (state = defaultSessionState, action) => {
    console.log(`Session Reducer process - ${action.type}`);
    switch (action.type) {
        case Actions.OPEN_SCREEN_SESSION: {
            console.log("OPEN SCREEN SESSION");
            const {sessionId, status, type} = action.payload;
            console.log(action.payload);
            return {...state, status, sessionId, type};
        }

        case Actions.FINISH_SESSION: {
            const {training_result} = action.payload;
            console.log(action.payload);
            return {...state, trainingResult: {...training_result}, status: SessionStatus.READY};
        }

        case Actions.START_SESSION: {
            const {session_status} = action.payload;
            console.log(action.payload);
            return {...state, status: session_status};
        }

        case Actions.RESET_TRAINING_RESULT: {
            return {...state, trainingResult: null}
        }

        case Actions.START_CALL: {
            return {...state, call: true}
        }

        case Actions.END_CALL: {
            return {...state, call: false}
        }
    }

    return state;
}