import React from 'react';
import {getOrEmpty} from "../../../core/store/util";

const VariantItemView = ({index, variant, template}) => {
    return (
        <div style={{backgroundColor: "lightgrey", borderRadius: "20px", padding: "20px"}} >
            <div>Вариант {index + 1}</div>
            {template.map(field =>
                (
                    <div >
                        <div style={{fontSize: "12px"}} >{field.label}</div>
                        <div>{getOrEmpty(variant, field.name)}</div>
                    </div>
                )
            )}
        </div>
    );
};

export default VariantItemView;