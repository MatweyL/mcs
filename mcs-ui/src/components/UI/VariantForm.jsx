import React, {useEffect, useState} from 'react';
import Field from "./Field/Field";
import FormButton from "./FormButton/FormButton";
import {clone} from "../../core/store/helper/clone_util";
import {getOrEmpty} from "../../core/store/util";

const VariantForm = ({trainingLabel, template, variants, index, setVariants, addVariant}) => {
    const [enabled, setEnabled] = useState(false);

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

    const updateVariant = (event, name) => {
        const cloneVariants = clone(variants);

        cloneVariants[index] = {...variant, [name]: event.target.value};

        setVariants(cloneVariants);
    }

    return (
        <div style={{display: "flex", flexDirection: "column", width: "300px"}}>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div>Вариант №{index + 1}</div>
                <div>{trainingLabel}</div>
            </div>
            {
                template.map(field =>
                    <Field title={field.label}
                           value={getOrEmpty(variant, field.name)}
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