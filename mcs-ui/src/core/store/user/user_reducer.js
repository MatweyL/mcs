import Actions from "../../constants/actions";
import {AuthStatus} from "../../constants/auth_statuses";

const defaultState = {
    authenticated: false,
    token: ""
}

export const userReducer = (state = defaultState, action) => {
    console.log(`User Reducer process - ${action.type}`);
    switch (action.type) {
        case Actions.AUTHENTICATE: {
            console.log(action.payload);
            const {status, token} = action.payload;
            if (status === AuthStatus.NON_AUTHENTICATED) {
                return {authenticated: false, token: null};
            }
            return {authenticated: true, token};
        }
    }

    return state;
}