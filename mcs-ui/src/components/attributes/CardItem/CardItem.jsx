import React from 'react';
import classes from "./CardItem.module.css";

/// Атрибут - Карточка
const CardItem = ({attribute}) => {
    return (
        <div className={attribute.active ? classes.cardItemActive : classes.cardItem}>
            <div className={attribute.used ? classes.iconActive : classes.icon}>*</div>
            <div className={classes.label}>{attribute.label}</div>
        </div>
    );
};

export default CardItem;