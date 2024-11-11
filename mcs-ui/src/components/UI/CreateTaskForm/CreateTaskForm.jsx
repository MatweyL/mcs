import React, {useEffect, useState} from 'react';
import FormButton from "../FormButton/FormButton";
import Modal from "../Modal/Modal";
import FieldSelectbox from "../FieldSelectbox/FieldSelectbox";
import Devices from "../../../core/constants/devices";
import Trainings from "../../../core/constants/trainings";
import VariantForm from "../VariantForm";
import TextButton from "../TextButton/TextButton";

const CreateTaskForm = () => {
        const [visible, setVisible] = useState(false);
        const [training, setTraining] = useState('')
        const [nowForm, setNowForm] = useState(0);
        const [variants, setVariants] = useState([]);
        const [enabledVariants, setEnabledVariants] = useState(false);
        const [enabledIssueTask, setEnabledIssueTask] = useState(false);

        useEffect(() => {
            setVariants([]);
            if (training) {
                setEnabledVariants(true);
            } else {
                setEnabledVariants(false);
            }
        }, [training]);

        useEffect(() => {
            console.log(variants);
            if (variants.length > 0) {
                setEnabledIssueTask(true)
            } else {
                setEnabledIssueTask(false);
            }
        }, [variants]);

        const openTaskPopup = () => {
            setVisible(true);
        }

        const addVariant = () => {
            const nowLength = variants.length;
            setVariants([...variants, nowLength === 0 ? {} : variants[nowLength - 1]])
            setNowForm(nowLength + 1);
        }

        const issueTask = (lastVariant) => {
            const updatedVariants = [...variants, lastVariant];
            setVariants(updatedVariants);
            // send request to BE
            console.log(updatedVariants);
            onClose();
        }

        function getModal() {
            return (
                <div>
                    <FieldSelectbox title={"Устройство"} options={Devices.VALUES}/>
                    <FieldSelectbox title={"УТК"} options={Trainings.VALUES}
                                    value={training}
                                    onChange={e => setTraining(e.target.value)}/>
                    <div style={{marginTop: "20px"}}>
                        <FormButton onClick={addVariant} label={"Сформировать варианты"} enabled={enabledVariants}/>
                    </div>
                </div>
            );
        }

        const getForm = (index) => {
            return index === 0
                ? getModal()
                : (
                    <VariantForm
                        training={training}
                        index={index - 1}
                        variants={variants}
                        setVariants={setVariants}
                        addVariant={addVariant}
                    />
                );
        }

        useEffect(() => {
            console.log(variants)
            console.log(nowForm)
        }, [nowForm])


        const onClose = () => {
            setVisible(false);
            setVariants([]);
            setNowForm(0);
        }

        return (
            <div>
                <div style={{width: '150px', padding: "5px"}}>
                    <FormButton label={"Выдать задание"} onClick={openTaskPopup}/>
                </div>
                <Modal visible={visible} close={onClose}>
                    <div style={{display: "flex"}}>
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <div>
                                <TextButton onClick={() => setNowForm(0)}>
                                    К заданию
                                </TextButton>
                                <div style={{height: "20px"}}/>
                                <div>
                                    {
                                        variants.map((value, index) => {
                                            return (
                                                <TextButton onClick={() => setNowForm(index + 1)}>
                                                    Вариант {index + 1}
                                                </TextButton>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {enabledIssueTask &&
                                <div style={{width: "200px"}}>
                                    <FormButton label={"Выдать варианты"} enabled={enabledIssueTask} onClick={issueTask}/>
                                </div>
                            }
                        </div>
                        <div style={{width: "20px"}}/>
                        <div>
                            {getForm(nowForm)}
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
;

export default CreateTaskForm;