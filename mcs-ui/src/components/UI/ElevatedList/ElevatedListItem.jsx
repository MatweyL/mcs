import React from 'react';
import classes from "./ElevatedListItem.module.css";


const ElevatedListItem = ({item}) => {
    return (
        <div className={item.active ? classes.elevatedListItemActive : classes.elevatedListItem}>
            {item.label}
        </div>
    );
};

export default ElevatedListItem;