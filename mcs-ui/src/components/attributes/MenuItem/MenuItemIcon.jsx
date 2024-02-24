import React from 'react';
import {Icons} from "../../../core/constants/icons";
import classes from "./MenuItem.module.css";

const MenuItemIcon = ({icon}) => {
    return (
        icon ? <img src={Icons.of(icon)}
                    className={classes.menuItemIcon}
                    alt={icon}
                    style={{scale: '70%'}}
        /> : null
    );
};

export default MenuItemIcon;