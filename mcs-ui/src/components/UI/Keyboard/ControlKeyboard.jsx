import React, {useState} from 'react';
import {clone} from "../../../core/store/helper/clone_util";
import Actions from "../../../core/constants/actions";
import {useDispatch} from "react-redux";
import {useScreen} from "../../../hooks/useScreen";
import Key from "../Key";
import classes from "./Keyboard.module.css";
import {execute} from "../../../core/store/execute";
import {useScreenSessionId} from "../../../hooks/useSession";

let context, source, globalStream, workletNode;

const ControlKeyboard = () => {
    const dispatch = useDispatch();
    const screen = useScreen();
    const sessionId = useScreenSessionId();
    const [audio, setAudio] = useState();

    const left = () => executeButton(screen.buttons.leftButton);

    const right = () => executeButton(screen.buttons.rightButton);

    const executeButton = (buttonMeta) => {
        execute(dispatch, {meta: buttonMeta, payload: getPayload(buttonMeta.payload)})
    }

    const getPayload = (buttonPayload) => {
        const nowAttribute = clone(screen.attributes[screen.selectedAttribute]);
        return {attribute: nowAttribute, state: screen, sessionId: sessionId, buttonPayload}
    }

    const up = () => {
        dispatch({type: Actions.UP, payload: {name: screen.selectedAttribute}});
    }

    const down = () => {
        dispatch({type: Actions.DOWN, payload: {name: screen.selectedAttribute}});
    }


    function noiseStart() {
        const handle = async (stream) => {
            globalStream = stream;
            context = new AudioContext({latencyHint: 'interactive'});

            await context.audioWorklet.addModule("/audio_processor.js");

            // Create a AudioWorkletNode to process the audio data
            workletNode = new AudioWorkletNode(context, 'audio-processor');

            // Connect the source to the script processor
            source = context.createMediaStreamSource(stream)
            source.connect(workletNode);
            workletNode.connect(context.destination);
        }

        navigator.mediaDevices.getUserMedia({audio: true, video: false})
            .then(handle)
    }

    const startCall = () => {
        dispatch({type: Actions.START_CALL});
    }

    function noiseStop() {
        // Disconnect the source from the script processor
        source.disconnect(workletNode);
        workletNode.disconnect(context.destination);

        context.close().then(() => {
            source = null;
            workletNode = null;
            context = null;
        });
    }

    const endCall = () => {

        dispatch({type: Actions.END_CALL});
    }

    return (
        <div className={classes.controlKeyboard}>
            <div className={classes.keysRow}>
                <Key onClick={left}><img src="/buttons/left.svg" alt="call"/></Key>
                <Key onClick={up}><img src="/buttons/up.svg" alt="call"/></Key>
                <Key onClick={right}><img src="/buttons/right.svg" alt="call"/></Key>
            </div>
            <div className={classes.keysRow}>
                <Key onClick={startCall}><img src="/buttons/green.svg" alt="call"/></Key>
                <Key onClick={down}><img src="/buttons/down.svg" alt="call"/></Key>
                <Key onClick={endCall}><img src="/buttons/red.svg" alt="cancel"/></Key>
            </div>
        </div>
    );
};

export default ControlKeyboard;