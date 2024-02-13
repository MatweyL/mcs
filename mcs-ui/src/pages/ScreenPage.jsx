import React, {useEffect, useReducer} from 'react';
import Button from "../components/attributes/Button";
import {convert} from "../store/convert";
import {executeAction} from "../store/action";
import Actions from "../store/constants/actions";
import {reducer_v2} from "../store/reducer_v2";
import Key from "../components/UI/Key";
import {useDispatch, useSelector} from "react-redux";

/**
 * Страница экрана телефона
 */
const ScreenPage = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.screen);

    useEffect(() => {
        executeAction(dispatch, {action: Actions.LOAD})
    }, []);

    const left = () => {
        const nowAttribute = state.attributes[state.selectedAttribute];
        executeAction(dispatch, state.buttons.leftButton, nowAttribute, state);
    }

    const right = () => {
        const nowAttribute = state.attributes[state.selectedAttribute];
        executeAction(dispatch, state.buttons.rightButton, nowAttribute, state);
    }

    const up = () => {
        dispatch({type: Actions.UP, payload: state.selectedAttribute});
    }

    const down = () => {
        dispatch({type: Actions.DOWN, payload: state.selectedAttribute});
    }

    const keyPress = (keys) => {
        dispatch({type: Actions.PRESS_KEY, payload: keys});
    }

    return (
        <div className="body">
            <div className="phone-header"/>
            <div className="screen-wrapper">
                <div className="screen">
                    <div className="screen-label">
                        {state?.label}
                    </div>
                    {state.attributes !== undefined ?
                        Object.keys(state?.attributes)
                            .map(name => convert(state.attributes[name], dispatch))
                        : null
                    }
                    <div className="buttons">
                        <Button button={state?.buttons?.leftButton}/>
                        <Button button={state?.buttons?.rightButton}/>
                    </div>
                </div>
            </div>
            <div className="keyboard">
                <div className="control-keyboard">
                    <div className="keys-row">
                        <Key onClick={left}><img src="/buttons/left.svg" alt="call"/></Key>
                        <Key onClick={up}><img src="/buttons/up.svg" alt="call"/></Key>
                        <Key onClick={right}><img src="/buttons/right.svg" alt="call"/></Key>
                    </div>
                    <div className="keys-row">
                        <Key><img src="/buttons/green.svg" alt="call"/></Key>
                        <Key onClick={down}><img src="/buttons/down.svg" alt="call"/></Key>
                        <Key><img src="/buttons/red.svg" alt="cancel"/></Key>
                    </div>
                </div>
                <div className="divider-keyboard"/>
                <div className="numpad-keyboard">
                    <div className="keys-row">
                        <Key onClick={() => keyPress(['1'])}>1</Key>
                        <Key onClick={() => keyPress("2АБВ".split(''))}>2<small>АБВ</small></Key>
                        <Key onClick={() => keyPress("3ГДЕЁ".split(''))}>3<small>ГДЕЁ</small></Key>
                    </div>
                    <div className="keys-row">
                        <Key onClick={() => keyPress("4ЖЗИЙ".split(''))}>4<small>ЖЗИЙ</small></Key>
                        <Key onClick={() => keyPress("5КЛМН".split(''))}>5<small>КЛМН</small></Key>
                        <Key onClick={() => keyPress("6ОПРС".split(''))}>6<small>ОПРС</small></Key>
                    </div>
                    <div className="keys-row">
                        <Key onClick={() => keyPress("7ТУФХ".split(''))}>7<small>ТУФХ</small></Key>
                        <Key onClick={() => keyPress("8ЦЧШ".split(''))}>8<small>ЦЧШ</small></Key>
                        <Key onClick={() => keyPress("9ЩЪЫ".split(''))}>9<small>ЩЪЫ</small></Key>
                    </div>
                    <div className="keys-row">
                        <Key onClick={() => keyPress(["*"])}>*</Key>
                        <Key onClick={() => keyPress("0ЬЭЮЯ".split(''))}>0<small>ЬЭЮЯ</small></Key>
                        <Key onClick={() => keyPress(["#"])}>#</Key>
                    </div>
                </div>
            </div>
            <svg width='0' height='0'>
                <filter id='grainy' x='0' y='0' width='100%' height='100%'>
                    <feTurbulence type='fractalNoise' baseFrequency='.537'/>
                    <feColorMatrix type='saturate' values='0'/>
                    <feBlend in='SourceGraphic' mode='multiply'/>
                </filter>
            </svg>
        </div>
    );
};

export default ScreenPage;
