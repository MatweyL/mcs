import React from 'react';
import classes from "./ButtonAttribute.module.css";

/**
 * Атрибут для отрисовки кнопки
 */
const ButtonAttribute = ({attribute}) => {
    return (
        <div style={{display: "flex", justifyContent: "end", margin: '10px 0 10px 0'}}>
            <button className={attribute.active ? classes.buttonAttributeActive : classes.buttonAttribute}>
                {attribute.label}
            </button>
        </div>
    );
};

export default ButtonAttribute;