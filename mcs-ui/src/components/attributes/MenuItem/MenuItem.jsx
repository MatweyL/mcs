import React from 'react';
import classes from "./MenuItem.module.css";
import MenuItemIcon from "./MenuItemIcon";

/**
 * Атрибут - Элемент списка меню
 */
const MenuItem = ({attribute}) => {
    const disabled = !attribute.value;

    return (
        <div className={attribute.active ? classes.menuItemActive : classes.menuItem}>
            <MenuItemIcon icon={attribute.icon}/>
            <div style={{opacity: disabled ? '0.4' : '1.0', paddingLeft: '10'}}>
                {attribute.label}
            </div>
        </div>
    );
};

export default MenuItem;