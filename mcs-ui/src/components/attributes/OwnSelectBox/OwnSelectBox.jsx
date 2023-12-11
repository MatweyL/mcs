import React from 'react';
import OwnSelectBoxList from "../../UI/OwnSelectboxList/OwnSelectBoxList";
import classes from "./OwnSelectBox.module.css";

/// Атрибут - Собственный селектбокс (множественный выбор)
/// замена SelectBox
const OwnSelectBox = ({attribute}) => {

    return (
        <div className={classes.ownSelectBoxWrapper}>
            {attribute.label}
            <div className={attribute.active ? classes.ownSelectBoxActive : classes.ownSelectBox}>
                {attribute?.dictionaryValues?.find(dictValue => dictValue.value === attribute.value)?.name}
                {attribute.open
                    ? <OwnSelectBoxList items={attribute.dictionaryValues}/>
                    : null
                }
            </div>
        </div>
    );
};

export default OwnSelectBox;