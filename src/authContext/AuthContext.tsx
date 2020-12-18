import React, {useEffect, useState} from "react";
import jwt from "jwt-decode";
import CoffeeOrderSystemApi from "../api/coffee-order-system-api";
import {useHistory} from "react-router-dom";

type Props = {
    user: {},
    authenticated: boolean,
    login: Function,
    logout: Function,
}

export const AuthContext = React.createContext<Props>({
    user: {},
    authenticated: false,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({children}: any) => {

    const api = new CoffeeOrderSystemApi();

    const isJwtExpired = () => {
        const token = localStorage.getItem("COS_JWT");
        try {
            if (token) {
                const tokenData: any = jwt(token);
                if (Date.now() >= tokenData.exp * 1000) {
                    localStorage.removeItem("COS_JWT");
                    localStorage.removeItem("user");
                    return false;
                }
                return true;
            }
            return false;
        } catch (error) {
            localStorage.removeItem("COS_JWT");
            localStorage.removeItem("user");
            return false;
        }
    }

    const [isAuthenticated, setAuthentication] = useState<any>(isJwtExpired());
    const [user, setUser] = useState<any>({});

    const login = (credentials: any) => {
        return api.login({email: credentials.email.value, password: credentials.password.value})
            .then(res => {
                localStorage.setItem("COS_JWT", res.data.access_token);
                setUser({...res.data.payload});
                setAuthentication(true);
                return res;
            }).catch(error => {
                return error;
            });
    }

    const logout = () => {
        localStorage.removeItem("COS_JWT");
        localStorage.removeItem("user");
        setAuthentication(false);
    }

    return (
        <AuthContext.Provider
            value={{
                authenticated: isAuthenticated,
                user: {...user},
                login: login,
                logout: logout,
            }}
        >{children}</AuthContext.Provider>
    );
}
