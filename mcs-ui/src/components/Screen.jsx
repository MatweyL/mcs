import React, {useEffect, useReducer} from 'react';
import Button from "./attributes/Button";
import {reducer} from "../store/reducer";
import {convert} from "../store/convert";
import {executeAction} from "../store/action";
import Actions from "../store/constants/actions";

const Screen = () => {
    const [state, dispatch] = useReducer(reducer, {attributes: {}})

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

    return (
        <div>
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
            <div className="keyboard">
                <div className="keys-row">
                    <div className="key" onClick={left}>^</div>
                    <div className="key" onClick={up}>/\</div>
                    <div className="key" onClick={right}>^</div>
                </div>
                <div className="keys-row">
                    <div className="key">Связь</div>
                    <div className="key" onClick={down}>\/</div>
                    <div className="key">Конец</div>
                </div>
                <div className="keys-row">
                    <div className="key">1</div>
                    <div className="key">2</div>
                    <div className="key">3</div>
                </div>
                <div className="keys-row">
                    <div className="key">4</div>
                    <div className="key">5</div>
                    <div className="key">6</div>
                </div>
                <div className="keys-row">
                    <div className="key">7</div>
                    <div className="key">8</div>
                    <div className="key">9</div>
                </div>
                <div className="keys-row">
                    <div className="key">*</div>
                    <div className="key">0</div>
                    <div className="key">#</div>
                </div>
            </div>
        </div>
    );
};

export default Screen;