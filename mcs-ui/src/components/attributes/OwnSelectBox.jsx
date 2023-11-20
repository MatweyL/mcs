import React from 'react';
import OwnSelectBoxList from "../UI/OwnSelectboxList/OwnSelectBoxList";

/// Атрибут - Собственный селектбокс (множественный выбор)
/// замена SelectBox
const OwnSelectBox = ({attribute}) => {

    return (
        <label>
            {attribute.label}
            <div className={`attribute${attribute.active ? '-active' : ''}`}>
                {attribute?.dictionaryValues?.find(dictValue => dictValue.value === attribute.value)?.name}
                {attribute.open
                    ? <OwnSelectBoxList items={attribute.dictionaryValues}/>
                    : null
                }
            </div>
        </label>
    );
};

export default OwnSelectBox;