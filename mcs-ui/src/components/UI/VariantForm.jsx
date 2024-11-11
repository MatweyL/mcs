import React, {useEffect, useState} from 'react';
import Trainings from "../../core/constants/trainings";
import Field from "./Field/Field";
import FormButton from "./FormButton/FormButton";
import {clone} from "../../core/store/helper/clone_util";

const templates = {
    [Trainings.UTK1]: [
        {"label": "Частота, МГц", "name": "frequency"},
        {"label": "Название канала", "name": "channel_name"},
    ],
    [Trainings.UTK2]: [
        {"label": "Частота, МГц", "name": "frequency"},
        {"label": "Название канала", "name": "channel_name"},
        {"label": "Название направление", "name": "direction_name"},
    ],
    [Trainings.UTK3]: [
        {"label": "Частота, МГц", "name": "frequency"},
        {"label": "Название канала", "name": "channel_name"},
    ],
    [Trainings.UTK4]: [
        {"label": "Частота, МГц", "name": "frequency"}
    ]
}

const VariantForm = ({training, variants, index, setVariants, addVariant}) => {
    const [enabled, setEnabled] = useState(false);

    const template = templates[training];
    const variant = variants[index];

    useEffect(() => {
        if (!variant) {
            return;
        }

        const amountFields = Object.keys(variant).length
        const targetFields = Object.keys(template).length
        const amountEmptyValues = Object.values(variant).filter(value => !value).length;

        const enabled = amountEmptyValues === 0
            && amountFields === targetFields;
        setEnabled(enabled);
    }, [variant]);

    const getOrDefault = (variant, name) => {
        if (variant) {
            return variant[name] ? variant[name] : '';
        }
        return ''
    }

    const updateVariant = (event, name) => {
        const cloneVariants = clone(variants);

        cloneVariants[index] = {...variant, [name]: event.target.value};

        setVariants(cloneVariants);
    }

    return (
        <div style={{display: "flex", flexDirection: "column", width: "300px"}}>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div>Вариант №{index + 1}</div>
                <div>{Trainings.getLabel(training)}</div>
            </div>
            {
                template.map(field =>
                    <Field title={field.label}
                           value={getOrDefault(variant, field.name)}
                           onChange={e => updateVariant(e, field.name)}
                    />
                )
            }
            <div style={{height: '20px'}}/>
            <FormButton label={"Добавить вариант"} enabled={enabled} onClick={addVariant}/>
        </div>
    );
};

export default VariantForm;