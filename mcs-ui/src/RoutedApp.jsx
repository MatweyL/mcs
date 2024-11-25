import React from 'react';
import {BrowserRouter, Link} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Profile from "./components/UI/Profile/Profile";
import {useInitialization} from "./hooks/useInitialization";

const RoutedApp = () => {
    useInitialization();

    return (
        <BrowserRouter>
            <Profile/>
            <Link to="/login"/>
            <AppRouter/>
        </BrowserRouter>
    );
};

export default RoutedApp;