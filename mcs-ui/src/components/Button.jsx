import React, {useEffect, useState} from 'react';

const Button = ({button, dispatch}) => {

    // Обработчик смены текущего выбранного элемента
    // useEffect(() => {
    //     if (selectedAttribute.type === undefined && button.type === undefined) {
    //         return;
    //     }
    //     console.log(button)
    //     let params = BUTTONS_PARAMS[button.type][selectedAttribute.type];
    //     console.log(params);
    //     setButton({...button, label: params.label, name: params.name});
    // }, [selectedAttribute])

    return (
        <div className="mcs-button" onClick={(e) => dispatch({type: button.name})}>
            {button.label}
        </div>
    );
};

export default Button;