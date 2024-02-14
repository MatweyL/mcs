import React, {useEffect} from 'react';
import Button from "../components/attributes/Button";
import {convert} from "../core/store/screen/convert";
import {executeAction} from "../core/store/action";
import Actions from "../core/constants/actions";
import Key from "../components/UI/Key";
import {useDispatch, useSelector} from "react-redux";
import {clone} from "../core/store/helper/clone_util";
import {executeRequest} from "../core/store/request";
import Requests from "../core/constants/requests";

/**
 * Страница экрана телефона
 */
const ScreenPage = () => {
    const dispatch = useDispatch();
    const screen = useSelector(state => state.screen);

    useEffect(() => {
        executeRequest(dispatch,{type: Requests.LOAD});
    }, []);

    const left = () => {
        const nowAttribute = clone(screen.attributes[screen.selectedAttribute]);
        executeAction(dispatch, screen.buttons.leftButton, nowAttribute, screen);
    }

    const right = () => {
        const nowAttribute = clone((screen.attributes[screen.selectedAttribute]));
        executeAction(dispatch, screen.buttons.rightButton, nowAttribute, screen);
    }

    const up = () => {
        dispatch({type: Actions.UP, payload: screen.selectedAttribute});
    }

    const down = () => {
        dispatch({type: Actions.DOWN, payload: screen.selectedAttribute});
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
                        {screen?.label}
                    </div>
                    {screen.attributes !== undefined ?
                        Object.keys(screen?.attributes)
                            .map(name => convert(screen.attributes[name]))
                        : null
                    }
                    <div className="buttons">
                        <Button button={screen?.buttons?.leftButton}/>
                        <Button button={screen?.buttons?.rightButton}/>
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