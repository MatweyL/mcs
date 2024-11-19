import React from 'react';
import {TrainingTemplates} from "../../../core/constants/training_templates";
import Trainings from "../../../core/constants/trainings";
import VariantItemView from "../VariantItemView/VariantItemView";

const VariantListView = ({variants, training}) => {
    const template = TrainingTemplates.VALUES[training];

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{textAlign: "center"}}>
                <div>
                    Проверьте корректность вариантов
                </div>
                <di>
                    <div><b>{Trainings.getLabel(training)}</b></div>
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