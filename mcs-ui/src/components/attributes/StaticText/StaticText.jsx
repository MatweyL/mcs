import React from 'react';
import classes from "./StaticText.module.css";

/**
 * Атрибут для отрисовки статичного текста
 */
const StaticText = ({attribute}) => {
    let className = attribute['ui:options'] ? attribute['ui:options'].className : 'default';

    return (
        <div className={classes[className]}>
            {attribute.label}
        </div>
    );
};

export default StaticText;