import React, {useEffect, useState} from 'react';
import FormButton from "../FormButton/FormButton";
import Modal from "../Modal/Modal";
import FieldSelectbox from "../FieldSelectbox/FieldSelectbox";
import VariantForm from "../VariantForm";
import TextButton from "../TextButton/TextButton";
import VariantListView from "../VarianListView/VariantListView";
import {fetchDevices, fetchTemplate, fetchTrainingTypes} from "../../../API/fetchers";
import {EMPTY_OPTION} from "../../../core/constants/ui";
import {request} from "../../../hooks/request";
import Requests from "../../../core/constants/requests";
import {useDispatch} from "react-redux";

const CreateTaskForm = ({group}) => {
    const [visible, setVisible] = useState(false);
    const [confirmCloseVisible, setConfirmCloseVisible] = useState(false);
    const [confirmIssueTaskVisible, setConfirmIssueTaskVisible] = useState(false);

    const [training, setTraining] = useState('')
    const [trainingLabel, setTrainingLabel] = useState('')

    const [nowForm, setNowForm] = useState(0);

    const [variants, setVariants] = useState([]);
    const [template, setTemplate] = useState([]);

    const [enabledVariants, setEnabledVariants] = useState(false);
    const [enabledIssueTask, setEnabledIssueTask] = useState(false);

    const [devices, setDevices] = useState([]);
    const [nowDevice, setNowDevice] = useState('');

    const [kinds, setKinds] = useState([]);

    useEffect(() => {
        fetchDevices().then(devices => {
            setDevices(devices);
            setNowDevice(devices[0].value);
        })
    }, []);

    useEffect(() => {
        if (nowDevice) {
            fetchTrainingTypes(nowDevice).then(kinds => setKinds([EMPTY_OPTION, ...kinds]))
        }
    }, [nowDevice])


    useEffect(() => {
        setVariants([]);
        if (training) {
            setEnabledVariants(true);
            setTrainingLabel(kinds[training]?.rich_label)
            fetchTemplate(training).then(template => setTemplate(template))
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

    const addVariant = () => {
        const nowLength = variants.length;
        setVariants([...variants, nowLength === 0 ? {} : variants[nowLength - 1]])
        setNowForm(nowLength + 1);
    }

    const dispatch = useDispatch();
    const issueTask = () => {
        console.log(variants);
        request(Requests.ISSUE_TASKS, {variants, training, group}, dispatch)
    }

    function getModal() {
        return (
            <div>
                <FieldSelectbox title={"Устройство"} options={devices} value={nowDevice}
                                onChange={e => setNowDevice(e.target.value)}/>
                <FieldSelectbox title={"УТК"} options={kinds} value={training}
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
                    trainingLabel={trainingLabel}
                    template={template}
                    index={index - 1}
                    variants={variants}
                    setVariants={setVariants}
                    addVariant={addVariant}
                />
            );
    }

    const confirmClosing = () => {
        setVisible(false);
        setConfirmCloseVisible(false)
        setVariants([]);
        setNowForm(0);
    }

    return (
        <div>
            <div style={{width: '150px', padding: "5px"}}>
                <FormButton label={"Выдать задание"} onClick={() => setVisible(true)}/>
            </div>
            <Modal visible={visible} close={() => setConfirmCloseVisible(true)}>
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
                                <FormButton label={"Выдать варианты"}
                                            enabled={enabledIssueTask}
                                            onClick={() => setConfirmIssueTaskVisible(true)}/>
                            </div>
                        }
                    </div>
                    <div style={{width: "20px"}}/>
                    <div>
                        {getForm(nowForm)}
                    </div>
                </div>
            </Modal>
            <Modal visible={confirmCloseVisible} close={() => setConfirmCloseVisible(false)}>
                <div style={{display: "flex", flexDirection: "column", width: "350px"}}>
                    <div style={{textAlign: "center"}}>
                        Вы действительно хотите закрыть форму выдачи вариантов?
                    </div>
                    <div style={{height: "20px"}}/>
                    <div style={{display: "flex", width: "100%", justifyContent: "space-between"}}>
                        <div style={{width: "40%"}}>
                            <FormButton label={"Закрыть форму"} onClick={confirmClosing}/>
                        </div>
                        <div style={{width: "40%"}}>
                            <FormButton label={"Вернуться"} onClick={() => setConfirmCloseVisible(false)}/>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal visible={confirmIssueTaskVisible} close={() => setConfirmIssueTaskVisible(false)}>
                <div style={{display: "flex", width: "100%", justifyContent: "space-between", flexDirection: "column"}}>
                    <VariantListView variants={variants} trainingLabel={trainingLabel} template={template}/>
                    <div style={{height: "20px"}}/>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div style={{width: "40%"}}>
                            <FormButton label={"Вернуться к редактированию"}
                                        onClick={() => setConfirmIssueTaskVisible(false)}/>
                        </div>
                        <div style={{width: "40%"}}>
                            <FormButton label={"Выдать варианты"} onClick={issueTask}/>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CreateTaskForm;