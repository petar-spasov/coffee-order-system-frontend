import {errors} from "../constants/errors";

export const validateEmail = (input: string) => {
    if(!input) {
        return errors.general.empty;
    }
    if (!input.match('\\S+@\\S+\\.\\S+')){
        return errors.email.invalid;
    }
    return '';
}

export const validatePassword = (input: string) => {
    if (!input){
        return errors.general.empty;
    }
    return '';
}

export const validatePasswordForRegister = (input: string) => {
    if (!input.match('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')){
        return errors.password.invalid;
    }
    return '';
}

export const validatePasswordMatching = (password: string, repeatedPassword: string) => {
    if (!repeatedPassword){
        return errors.general.empty;
    }
    if (repeatedPassword !== password){
        return errors.password.notMatching;
    }
    return '';
}

export const validateName = (input: string) => {
    if (!input){
        return errors.general.empty;
    }
    return '';
}

export const validateAmount = (input: number) => {
    if (!input){
        return errors.general.empty;
    }
    if (isNaN(input)){
        return errors.amount.notNumber;
    }
    if(input > 5) {
        return errors.amount.outOfRange;
    }
    if (input < 1) {
        return errors.amount.outOfRange;
    }
    return '';
}
