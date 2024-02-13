import React from 'react';
import {BrowserRouter, Link} from "react-router-dom";
import AppRouter from "./components/AppRouter";

const RoutedApp = () => {
    return (
        <BrowserRouter>
            <Link to="/login"/>
            <AppRouter/>
        </BrowserRouter>
    );
};

export default RoutedApp;