import React from 'react';
import {convert} from "../../../core/store/screen/convert";
import Button from "../../attributes/Button";
import {useScreen} from "../../../hooks/useScreen";
import classes from "./Screen.module.css";
import ScreenLabel from "./ScreenLabel";
import ScreenButtons from "./ScreenButtons";

const Screen = () => {
    const screen = useScreen();

    return (
        <div className={classes.screenWrapper}>
            <div className={classes.screen}>
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