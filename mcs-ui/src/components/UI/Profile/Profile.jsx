import React, {useEffect, useState} from 'react';
import classes from "./Profile.module.css";
import {useDispatch} from "react-redux";
import {useUserInfo} from "../../../hooks/useUserInfo";
import Requests from "../../../core/constants/requests";
import {useNavigate} from "react-router-dom";
import {RoutePaths} from "../../../router";
import {request} from "../../../hooks/request";
import Roles from "../../../core/constants/roles";

const Profile = () => {
    const {fio, token, authenticated, role} = useUserInfo()
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
        const targetPath = role === Roles.TEACHER
            ? RoutePaths.TEACHER_LOGIN
            : RoutePaths.LOGIN
        console.log(role);
        console.log(targetPath);
        navigate(targetPath);
    }

    return (
        authenticated
            ?
            <div className={classes.profileWrapper}>
                <div className={[classes.profileContainer, visible ? classes.profileWhiteSmokeBack : classes.profileWhiteBack].join(' ')}>
                    <div className={classes.profile} onClick={toggle}>
                        <p>{fio}</p>
                        <div className={classes.profileIcon}/>
                    </div>
                    {visible &&
                        <div className={classes.profileMenu}>
                            <p>В профиль</p>
                            <p onClick={logout}>Выйти</p>
                        </div>
                    }
                </div>
            </div>
            : null
    );
};

export default Profile;