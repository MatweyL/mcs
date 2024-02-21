import React from 'react';
import OwnSelectBoxList from "../../UI/OwnSelectboxList/OwnSelectBoxList";
import classes from "./OwnSelectBox.module.css";
import Width from "../../../core/constants/width";

/// Атрибут - Собственный селектбокс (множественный выбор)
/// замена SelectBox
const OwnSelectBox = ({attribute}) => {

    const width = Width.of(attribute.width);

    const wrapperClass = attribute.width === Width.FULL ? classes.ownSelectBoxWrapperFull : classes.ownSelectBoxWrapper;
    const activeClass =  classes.ownSelectBoxActive;
    const inactiveClass = classes.ownSelectBox;

    return (
        <div className={wrapperClass}>
            {attribute.label}
            <div className={attribute.active ? activeClass : inactiveClass} style={{width}}>
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