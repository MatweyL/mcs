import React, {useEffect, useState} from 'react';
import classes from "./MainScreenAttribute.module.css";

/**
 * Атрибут для отрисовки главного экрана
 */
const MainScreenAttribute = ({attribute}) => {
    const [date, setDate] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");

    useEffect(() => {
        const nowDate = new Date();
        const day = nowDate.getDate();
        const month = nowDate.getMonth() + 1;
        const formattedMonth = month.toString().padStart(2, "0");
        const year = nowDate.getFullYear();

        const formattedDate = `${day}.${formattedMonth}.${year}`
        setDate(formattedDate);
    }, []);

    const updateTime = () => {
        const nowDate = new Date();

        setHours(nowDate.getHours().toString().padStart(2, "0"));
        setMinutes(nowDate.getMinutes().toString().padStart(2, "0"));
        setSeconds(nowDate.getSeconds().toString().padStart(2, "0"));
    }

    useEffect(() => {
        updateTime()
        const interval = setInterval(() => updateTime(), 1000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className={classes.mainScreenAttribute}>
            <div className={classes.canvas}>
                <div className={classes.header}>
                    <div className={classes.time}>
                        <div>{hours}</div>
                        <div>:{minutes}</div>
                        <div>:{seconds}</div>
                    </div>
                    <div>Дежурный прием</div>
                    <div>Открытый режим</div>
                </div>

                <div className={classes.direction}>
                    <div>{attribute.activeChannelName}</div>
                    <div>{attribute.activeDirectionName}</div>
                    <div>{date}</div>
                </div>
                <div style={{height: "30px"}}/>
                <div className={classes.buttons}>
                    <div>Меню</div>
                    <div>Направления</div>
                </div>
            </div>
            <img src="/wallpapers/1.jpg" alt="wall-paper" className={classes.mainScreenAttribute}/>
        </div>
    );
};

export default MainScreenAttribute;