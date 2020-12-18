import React, {useContext, useState} from "react";
import styles from './LoginForm.module.scss';
import InputField from "../../atoms/InputField/InputField";
import {validateEmail, validatePassword} from "../../../validation/validationMethods";
import Button from "../../atoms/Button/Button";
import CoffeeOrderSystemApi from "../../../api/coffee-order-system-api";
import Header, {Tag} from "../../atoms/Header/Header";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../../authContext/AuthContext";

type Props = {}

type Credentials = {
    email: {
        value: string,
        error: any,
    },
    password: {
        value: string,
        error: any,
    },
}

const LoginForm: React.FC<Props> = () => {

    const authContext = useContext(AuthContext);
    const [credentials, setCredentials] = useState<Credentials>({
        email: {
            value: '',
            error: null,
        },
        password: {
            value: '',
            error: null,
        },
    });
    const [serverError, setServerError] = useState<string>('');
    const history = useHistory();

    const handleInput = (event: any, validationMethod: Function) => {
        setCredentials(prevState => {
            return {
                ...prevState,
                [event.target.id]: {
                    value: event.target.value,
                    error: validationMethod(event.target.value),
                }
            }
        });
    }

    const submitForm = () => {
        authContext.login(credentials).then((res: any) => {
            if(res?.response?.data?.statusCode === 400){
                setServerError(res?.response?.data?.message);
                return res;
            }
            history.push('/');
            return res;
        });
    }

    const checkIfFormIsValid = () => {
        if (credentials.email.error !== '' || credentials.password.error !== '') {
            return true;
        }
        return false;
    }

    return (
        <div className={styles.formWrapper}>
            <Header Element={Tag.H2} text={"Anmelden"}/>
            <InputField type={"email"} value={credentials.email.value} onChange={handleInput}
                        validationMethod={validateEmail}
                        label={"E-Mail"} id={"email"} error={credentials.email.error}/>
            <InputField type={"password"} value={credentials.password.value} onChange={handleInput}
                        validationMethod={validatePassword}
                        label={"Passwort"} id={"password"} error={credentials.password.error}/>
            <Button onClick={submitForm} size={"medium"} text={"Anmelden"} disabled={checkIfFormIsValid()}/>
            <p className={styles.error}>{serverError}</p>
        </div>
    );
}

export default LoginForm;
