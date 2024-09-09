import React from 'react';
import classes from "./SelectableCardItem.module.css";

/**
 * Атрибут - карточка, которую можно выбрать
 */
const SelectableCardItem = ({attribute}) => {
    return (
        <div className={attribute.active ? classes.cardItemActive : classes.cardItem}>
            <div className={attribute.used ? classes.iconActive : classes.icon}>*</div>
            <div className={classes.label}>{attribute.label}</div>
        </div>
    );
};

export default SelectableCardItem;