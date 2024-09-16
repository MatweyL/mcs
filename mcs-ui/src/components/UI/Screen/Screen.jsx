import React from 'react';
import {convert} from "../../../core/store/screen/convert";
import {useScreen} from "../../../hooks/useScreen";
import classes from "./Screen.module.css";
import ScreenLabel from "./ScreenLabel";
import ScreenButtons from "./ScreenButtons";
import CallNotification from "./CallNotification";
import {useSession} from "../../../hooks/useSession";

const Screen = () => {
    const screen = useScreen();
    const {call, sessionId} = useSession();

    return (
        <div className={classes.screenWrapper}>
            <div className={classes.screen}>
                {call ? <CallNotification sessionId={sessionId}/> : null}
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