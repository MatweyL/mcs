import {configureStore} from "@reduxjs/toolkit";
import {screenReducer} from "./screen/screen_reducer";
import {sessionListReducer} from "./session/session_list_reducer";
import {userReducer} from "./user/user_reducer";
import {sessionReducer} from "./session/session_reducer";
import {hintReducer} from "./hint/hint_reducer";
import {eventReducer} from "./event/event_reducer";

export const store = configureStore({
    reducer: {
        screen: screenReducer,
        sessions: sessionListReducer,
        session: sessionReducer,
        user: userReducer,
        hint: hintReducer,
        event: eventReducer
    },
})