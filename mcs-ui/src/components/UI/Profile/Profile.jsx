import React, {useEffect, useState} from 'react';
import classes from "./Profile.module.css";
import {useDispatch} from "react-redux";
import {useUserInfo} from "../../../hooks/useUserInfo";
import {execute} from "../../../core/store/execute";
import Requests from "../../../core/constants/requests";
import {useNavigate} from "react-router-dom";
import {RoutePaths} from "../../../router";

const Profile = () => {
    const {fio, token, authenticated} = useUserInfo()
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggle = () => {
        setVisible(!visible);
    }

    useEffect(() => {
        if (token) {
            execute(dispatch, {
                meta: {action: {type: Requests.AUTHENTICATE, request: true}},
                payload: {value: token}
            })
        }
    }, [token]);

    const logout = () => {
        execute(dispatch, {meta: {action: {type: Requests.LOGOUT, request: true}}});
        navigate(RoutePaths.LOGIN);
    }

    return (
        authenticated
            ? <div className={classes.profileWrapper}>
                <div className={classes.profile} onClick={toggle}>
                    <p>{fio}</p>
                    <div className={classes.profileIcon}/>
                </div>
                <div className={classes.profileContainer} style={{opacity: visible ? '1.0' : '0'}}>
                    <div className={classes.profileMenu}>
                        <p>В профиль</p>
                        <p onClick={logout}>Выйти</p>
                    </div>
                </div>
            </div>
            : null
    );
};

export default Profile;