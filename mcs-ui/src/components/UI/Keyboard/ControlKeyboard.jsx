import React from 'react';
import {clone} from "../../../core/store/helper/clone_util";
import {executeAction} from "../../../core/store/action";
import Actions from "../../../core/constants/actions";
import {useDispatch} from "react-redux";
import {useScreen} from "../../../hooks/useScreen";
import Key from "../Key";
import classes from "./Keyboard.module.css";

const ControlKeyboard = () => {
    const dispatch = useDispatch();
    const screen = useScreen();

    const left = () => {
        const nowAttribute = clone(screen.attributes[screen.selectedAttribute]);
        executeAction(dispatch, screen.buttons.leftButton, nowAttribute, screen);
    }

    const right = () => {
        const nowAttribute = clone(screen.attributes[screen.selectedAttribute]);
        executeAction(dispatch, screen.buttons.rightButton, nowAttribute, screen);
    }

    const up = () => {
        dispatch({type: Actions.UP, payload: screen.selectedAttribute});
    }

    const down = () => {
        dispatch({type: Actions.DOWN, payload: screen.selectedAttribute});
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