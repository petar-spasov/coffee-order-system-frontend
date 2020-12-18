import React from "react";
import styles from './InputField.module.scss';

type Props = {
    type: string,
    id: string,
    label: string,
    onChange: Function,
    error: string,
    validationMethod: Function,
    value: string | number,
}

const InputField: React.FC<Props> = ({type, id, label, error, onChange, validationMethod, value}) => {

    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <input className={styles.input}
                   type={type}
                   value={value}
                   id={id}
                   onChange={(event) => onChange(event, validationMethod)}
            />
            <p className={styles.error}>{error}</p>
        </div>
    );
}

export default InputField;
