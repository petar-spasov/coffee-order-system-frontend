import React from "react";
import styles from './Modal.module.scss';
import Card from "../../atoms/Card/Card";

type Props = {
    onClose: Function,
}

const Modal: React.FC<Props> = ({children, onClose}) => {

    return(
        <div className={styles.overlay}>
            <div className={styles.modalCard}>
                <p onClick={() => onClose()} className={styles.closeButton}>Schliessen</p>
                {children}
            </div>
        </div>
    );
}

export default Modal;
