import React from 'react';
import classes from './OwnSelectBoxListItem.module.css'

const OwnSelectBoxListItem = ({item}) => {
    return (
        <div className={item?.active
            ? classes.ownSelectBoxListItemActive
            : classes.ownSelectBoxListItem}>
            {item.name}
        </div>
    );
};

export default OwnSelectBoxListItem;