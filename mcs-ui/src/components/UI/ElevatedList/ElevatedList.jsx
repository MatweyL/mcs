import React from 'react';
import classes from "./ElevatedList.module.css"
import ElevatedListItem from "./ElevatedListItem";

const ElevatedList = ({items}) => {
    return (
        <div className={classes.elevatedList}>
            {items.map(item =>
                <ElevatedListItem item={item}/>
            )}
        </div>
    );
};

export default ElevatedList;