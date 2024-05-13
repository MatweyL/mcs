import React from 'react';
import {convert} from "../../../core/store/screen/convert";
import Button from "../../attributes/Button";
import {useScreen} from "../../../hooks/useScreen";
import classes from "./Screen.module.css";
import ScreenLabel from "./ScreenLabel";
import ScreenButtons from "./ScreenButtons";
import {useSession} from "../../../hooks/useSession";
import CallNotification from "./CallNotification";

const Screen = () => {
    const screen = useScreen();
    const {call} = useSession();

    return (
        <div className={classes.screenWrapper}>
            <div className={classes.screen}>
                {call ? <CallNotification/> : null}
                <ScreenLabel label={screen?.label}/>
                {screen.attributes !== undefined ?
                    Object.keys(screen?.attributes)
                        .map(name => convert(screen.attributes[name]))
                    : null
                }
                <ScreenButtons buttons={screen?.buttons}/>
            </div>
        </div>
    );
};

export default Screen;