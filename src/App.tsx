import React, {useContext, useState} from 'react';
import './App.scss';
import {Route, BrowserRouter as Router, Switch, useHistory} from 'react-router-dom';
import Modal from "./components/organisms/Modal/Modal";
import LoginForm from "./components/organisms/LoginForm/LoginForm";
import CreateOrderPage from "./components/pages/CreateOrderPage/CreateOrderPage";
import jwt from 'jwt-decode';
import Register from "./components/pages/Register/Register";
import Orders from "./components/pages/Orders/Orders";
import Navigation from "./components/organisms/Navigation/Navigation";
import {AuthContext} from "./authContext/AuthContext";


function App() {

    const authContext = useContext(AuthContext);
    const routesForAuthenticatedUser =
        <>
            <Route exact path="/" component={CreateOrderPage}/>
            <Route exact path="/orders" component={Orders}/>
        </>
    const routesForUnauthenticatedUser =
        <>
            <Route exact path="/" component={LoginForm}/>
            <Route exact path="/login" component={LoginForm}/>
            <Route exact path="/register" component={Register}/>
        </>
    return (
        <Router>
            <Navigation/>
            <Switch>
                {authContext.authenticated ? routesForAuthenticatedUser : routesForUnauthenticatedUser}
            </Switch>
        </Router>
    );
}

export default App;
