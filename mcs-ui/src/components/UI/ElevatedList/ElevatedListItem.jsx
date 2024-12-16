import React from 'react';
import classes from "./ElevatedListItem.module.css";

const ElevatedListItem = ({item}) => {
    let classNames = [];
    if (item.active) {
        classNames.push(classes.elevatedListItemActive);
    } else {
        classNames.push(classes.elevatedListItem);
    }

    if (item.disabled) {
        classNames.push(classes.elevatedListItemDisabled)
    }

    return (
        <div className={classNames.join(" ")}>
            {item.label}
        </div>
    );
};

export default ElevatedListItem;