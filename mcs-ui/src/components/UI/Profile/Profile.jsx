import React, {useEffect, useState} from 'react';
import classes from "./Profile.module.css";
import {useDispatch} from "react-redux";
import {useUserInfo} from "../../../hooks/useUserInfo";
import Requests from "../../../core/constants/requests";
import {useNavigate} from "react-router-dom";
import {RoutePaths} from "../../../router";
import {request} from "../../../hooks/request";

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
            request(Requests.AUTHENTICATE, {value: token}, dispatch);
        }
    }, [token]);

    const logout = () => {
        request(Requests.LOGOUT, {}, dispatch);
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