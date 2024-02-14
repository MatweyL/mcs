import React from 'react';
import Key from "../Key";
import classes from "./Keyboard.module.css";
import Actions from "../../../core/constants/actions";
import {useDispatch} from "react-redux";

const NumpadKeyboard = () => {
    const dispatch = useDispatch();

    const keyPress = (keys) => {
        dispatch({type: Actions.PRESS_KEY, payload: keys});
    }

    return (
        <div className={classes.numpadKeyboard}>
            <div className={classes.keysRow}>
                <Key onClick={() => keyPress(['1'])}>1</Key>
                <Key onClick={() => keyPress("2АБВ".split(''))}>2<small>АБВ</small></Key>
                <Key onClick={() => keyPress("3ГДЕЁ".split(''))}>3<small>ГДЕЁ</small></Key>
            </div>
            <div className={classes.keysRow}>
                <Key onClick={() => keyPress("4ЖЗИЙ".split(''))}>4<small>ЖЗИЙ</small></Key>
                <Key onClick={() => keyPress("5КЛМН".split(''))}>5<small>КЛМН</small></Key>
                <Key onClick={() => keyPress("6ОПРС".split(''))}>6<small>ОПРС</small></Key>
            </div>
            <div className={classes.keysRow}>
                <Key onClick={() => keyPress("7ТУФХ".split(''))}>7<small>ТУФХ</small></Key>
                <Key onClick={() => keyPress("8ЦЧШ".split(''))}>8<small>ЦЧШ</small></Key>
                <Key onClick={() => keyPress("9ЩЪЫ".split(''))}>9<small>ЩЪЫ</small></Key>
            </div>
            <div className={classes.keysRow}>
                <Key onClick={() => keyPress(["*"])}>*</Key>
                <Key onClick={() => keyPress("0ЬЭЮЯ".split(''))}>0<small>ЬЭЮЯ</small></Key>
                <Key onClick={() => keyPress(["#"])}>#</Key>
            </div>
        </div>
    );
};

export default NumpadKeyboard;