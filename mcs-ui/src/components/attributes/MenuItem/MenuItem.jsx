import React from 'react';
import classes from "./MenuItem.module.css";

/// Атрибут - Элемент списка меню
const MenuItem = ({attribute}) => {
    return (
        <div className={attribute.active ? classes.menuItemActive : classes.menuItem}>
            {attribute.label}
        </div>
    );
};

export default MenuItem;