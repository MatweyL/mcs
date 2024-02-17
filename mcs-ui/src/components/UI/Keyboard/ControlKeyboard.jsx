import React from 'react';
import {clone} from "../../../core/store/helper/clone_util";
import Actions from "../../../core/constants/actions";
import {useDispatch} from "react-redux";
import {useScreen} from "../../../hooks/useScreen";
import Key from "../Key";
import classes from "./Keyboard.module.css";
import {execute} from "../../../core/store/executor";
import {useScreenSessionId} from "../../../hooks/useScreenSessionId";

const ControlKeyboard = () => {
    const dispatch = useDispatch();
    const screen = useScreen();
    const sessionId = useScreenSessionId();

    const left = () => {
        execute(dispatch, {meta: screen.buttons.leftButton.action, payload: getPayload()})
    }

    const right = () => {
        execute(dispatch, {meta: screen.buttons.rightButton.action, payload: getPayload()})
    }

    const getPayload = () => {
        const nowAttribute = clone(screen.attributes[screen.selectedAttribute]);
        return {attribute: nowAttribute, state: screen, sessionId: sessionId}
    }

    const up = () => {
        dispatch({type: Actions.UP, payload: {name: screen.selectedAttribute}});
    }

    const down = () => {
        dispatch({type: Actions.DOWN, payload: {name: screen.selectedAttribute}});
    }


    return (
        <div className={classes.controlKeyboard}>
            <div className={classes.keysRow}>
                <Key onClick={left}><img src="/buttons/left.svg" alt="call"/></Key>
                <Key onClick={up}><img src="/buttons/up.svg" alt="call"/></Key>
                <Key onClick={right}><img src="/buttons/right.svg" alt="call"/></Key>
            </div>
            <div className={classes.keysRow}>
                <Key><img src="/buttons/green.svg" alt="call"/></Key>
                <Key onClick={down}><img src="/buttons/down.svg" alt="call"/></Key>
                <Key><img src="/buttons/red.svg" alt="cancel"/></Key>
            </div>
        </div>
    );
};

export default ControlKeyboard;