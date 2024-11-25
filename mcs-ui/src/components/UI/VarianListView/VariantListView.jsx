import React from 'react';
import VariantItemView from "../VariantItemView/VariantItemView";

const VariantListView = ({variants, template, trainingLabel}) => {
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{textAlign: "center"}}>
                <div>
                    Проверьте корректность вариантов
                </div>
                <di>
                    <div><b>{trainingLabel}</b></div>
                </di>
            </div>
            <div style={{height: "20px"}}/>
            <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: "20px"}}>
                {variants.map((variant, index) =>
                    <VariantItemView template={template} variant={variant} index={index}/>
                )}
            </div>
        </div>
    );
};

export default VariantListView;