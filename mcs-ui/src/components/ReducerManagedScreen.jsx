import React, {useEffect, useReducer} from 'react';
import Button from "./Button";
import {reducer} from "../store/reducer";
import {convert} from "../store/convert";
import API from "../API/api";

const defaultState = {
    attributes: {},
    selectedAttribute: null,
    buttons: {
        leftButton: {
            "name": "SELECT", "label": "Выбрать", "type": "LEFT"
        },
        rightButton: {
            "name": "ERASE", "label": "Стереть", "type": "RIGHT"
        }
    }
}

const ReducerManagedScreen = () => {
    const [state, dispatch] = useReducer(reducer, {attributes: {}})

    const handleGetScreen = async () => {
        const data = await API.getScreen(
            "SERVICE_MENU"
        );
        dispatch({
            type: "INIT",
            payload: data,
        });
    };

    useEffect(() => {
        handleGetScreen();
    }, []);

    const left = () => {
        dispatch({type: state.buttons.leftButton.name});
    }

    const right = () => {
        dispatch({type: state.buttons.rightButton.name,
            payload: state.attributes[state.selectedAttribute]});
    }

    const up = () => {
        dispatch({type: "UP", payload: state.selectedAttribute});
    }

    const down = () => {
        dispatch({type: "DOWN", payload: state.selectedAttribute});
    }

    return (
        <div>
            <div className="screen">
                <div className="screen-label">
                    {state?.label}
                </div>
                    { state.attributes !== undefined ?
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

const TYPE_TO_INSTRUCTION = {
    "SHOW": (a) => a.visible = true,
    "HIDE": hide,
}

function hide(attribute) {
    attribute.value = null;
    attribute.visible = false;
}

export default ReducerManagedScreen;