import React from 'react';
import styles from './Button.module.scss';

type Sizes = 'small' | 'medium' | 'large';

type Props = {
    text: string,
    onClick: Function,
    disabled: boolean,
    size: Sizes
}

const Button: React.FC<Props> = ({text, onClick, disabled, size}) => {

    const getCssClass = (size: Sizes): string => {
        if (size === 'small') {
            return 'small';
        }
        if (size === 'medium'){
            return 'medium'
        }
        return 'large';
    }

    return (
        <button disabled={disabled} onClick={() => onClick()} className={styles[getCssClass(size)]}>{text}</button>
    );
}

export default Button;
