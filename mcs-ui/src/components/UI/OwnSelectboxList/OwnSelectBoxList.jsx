import React from 'react';
import OwnSelectBoxListItem from "./OwnSelectBoxListItem";
import classes from "./OwnSelectBoxList.module.css"

const OwnSelectBoxList = ({items}) => {
    return (
        <div className={classes.ownSelectBoxList}>
            {items.map(item => <OwnSelectBoxListItem item={item} key={item.value}/>)}
        </div>
    );
};

export default OwnSelectBoxList;