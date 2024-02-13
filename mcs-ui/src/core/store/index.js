import {configureStore} from "@reduxjs/toolkit";
import {screenReducer} from "./screen/screen_reducer";
import {sessionReducer} from "./session/session_reducer";

export const store = configureStore({
    reducer: {
        screen: screenReducer,
        sessions: sessionReducer
    },
})