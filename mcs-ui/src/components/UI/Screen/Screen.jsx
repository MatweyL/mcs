import React from 'react';
import {convert} from "../../../core/store/screen/convert";
import Button from "../../attributes/Button";
import {useScreen} from "../../../hooks/useScreen";
import classes from "./Screen.module.css";

const Screen = () => {
    const screen = useScreen();

    return (
        <div className={classes.screenWrapper}>
            <div className={classes.screen}>
                <div className={classes.screenLabel}>
                    {screen?.label}
                </div>
                {screen.attributes !== undefined ?
                    Object.keys(screen?.attributes)
                        .map(name => convert(screen.attributes[name]))
                    : null
                }
                <div className={classes.buttons}>
                    <Button button={screen?.buttons?.leftButton}/>
                    <Button button={screen?.buttons?.rightButton}/>
                </div>
            </div>
        </div>
    );
};

export default Screen;