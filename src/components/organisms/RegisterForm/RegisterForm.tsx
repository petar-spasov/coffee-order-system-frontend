import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import styles from './RegisterForm.module.scss';
import InputField from "../../atoms/InputField/InputField";
import {
    validateEmail,
    validateName,
    validatePasswordForRegister,
    validatePasswordMatching
} from "../../../validation/validationMethods";
import Button from "../../atoms/Button/Button";
import CoffeeOrderSystemApi from "../../../api/coffee-order-system-api";
import Header, {Tag} from "../../atoms/Header/Header";

type Props = {}

type Credentials = {
    name: {
        value: string,
        error: any,
    },
    lastName: {
        value: string,
        error: any,
    },
    email: {
        value: string,
        error: any,
    },
    password: {
        value: string,
        error: any,
    },
    passwordRepeat: {
        value: string,
        error: any,
    },
}

const RegisterForm: React.FC<Props> = () => {

    const history = useHistory();
    const [credentials, setCredentials] = useState<Credentials>({
        name: {
            value: '',
            error: null,
        },
        lastName: {
            value: '',
            error: null,
        },
        email: {
            value: '',
            error: null,
        },
        password: {
            value: '',
            error: null,
        },
        passwordRepeat: {
            value: '',
            error: null,
        },
    });
    const [serverError, setServerError] = useState<string>('');
    const api = new CoffeeOrderSystemApi();

    const handleInput = (event: any, validationMethod: Function) => {
        setCredentials(prevState => {
            return {
                ...prevState,
                [event.target.id]: {
                    value: event.target.value,
                    error: event.target.id === "passwordRepeat" ? validationMethod(prevState.password.value, event.target.value)
                        : validationMethod(event.target.value),
                }
            }
        });
    }

    const submitForm = () => {
        api.register({
            name: credentials.name.value, lastName: credentials.lastName.value, email: credentials.email.value,
            password: credentials.password.value
        }).then(response => {
            history.push("/");
        }).catch(error => {
            setServerError(error.response.data.message);
        });
    }

    const checkIfFormIsValid = () => {
        if (credentials.email.error !== '' || credentials.password.error !== '' || credentials.name.error !== ''
            || credentials.lastName.error !== '' || credentials.passwordRepeat.error !== '') {
            return true;
        }
        return false;
    }

    return (
        <div className={styles.formWrapper}>
            <Header Element={Tag.H2} text={"Registrieren"}/>
            <InputField type={"text"} value={credentials.name.value} onChange={handleInput}
                        validationMethod={validateName}
                        label={"Name"} id={"name"} error={credentials.name.error}/>
            <InputField type={"text"} value={credentials.lastName.value} onChange={handleInput}
                        validationMethod={validateName}
                        label={"Nachname"} id={"lastName"} error={credentials.lastName.error}/>
            <InputField type={"email"} value={credentials.email.value} onChange={handleInput}
                        validationMethod={validateEmail}
                        label={"E-Mail"} id={"email"} error={credentials.email.error}/>
            <InputField type={"password"} value={credentials.password.value} onChange={handleInput}
                        validationMethod={validatePasswordForRegister}
                        label={"Passwort"} id={"password"} error={credentials.password.error}/>
            <InputField type={"password"} value={credentials.passwordRepeat.value} onChange={handleInput}
                        validationMethod={validatePasswordMatching}
                        label={"Passwort wiederholen"} id={"passwordRepeat"} error={credentials.passwordRepeat.error}/>
            <Button onClick={submitForm} size={"medium"} text={"Registrieren"} disabled={checkIfFormIsValid()}/>
            <p className={styles.error}>{serverError}</p>
        </div>
    );
}

export default RegisterForm;
