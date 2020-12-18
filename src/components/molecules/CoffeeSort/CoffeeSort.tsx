import React, {useState} from 'react';
import styles from './CoffeeSort.module.scss'
import Modal from "../../organisms/Modal/Modal";
import {BrowserRouter as Router, useHistory} from "react-router-dom";
import InputField from "../../atoms/InputField/InputField";
import {validateAmount} from "../../../validation/validationMethods";
import Button from "../../atoms/Button/Button";
import CoffeeOrderSystemApi from "../../../api/coffee-order-system-api";
import jwt from "jwt-decode";

type Props = {
    img: string,
    coffeeSortName: string,
    price: number,
    coffeeSortId: number,
}

type Amount = {
    value: number,
    error: any,
}


const CoffeeSort: React.FC<Props> = ({img, coffeeSortName, price, coffeeSortId}) => {

    const api = new CoffeeOrderSystemApi();
    const [modal, setModal] = useState(false);
    const [serverError, setServerError] = useState<string>('');
    const [amount, setAmount] = useState<Amount>({
        value: 1,
        error: '',
    });
    const history = useHistory();

    const handleInput = (event: any, validationMethod: Function) => {
        setAmount({
            value: event.target.value,
            error: validationMethod(event.target.value),
        });
    }

    const openModal = () => {
        setModal(true);
    }
    const closeModal = () => {
        setModal(false);
    }

    const isFormValid = () => {
        return amount.error !== '';
    }

    const submitForm = () => {
        const token: string = localStorage.getItem("COS_JWT") || "";
        const tokenData: any = jwt(token);
        const requestData = {
            user: {
                id: tokenData.id,
                name: tokenData.name,
                lastName: tokenData.lastName,
                email: tokenData.email,
            },
            sort: {
                sortId: coffeeSortId,
                sortName: coffeeSortName,
                price: price,
                imageLink: img,
            },
            amount: amount.value,
            status: {
                statusId: 1,
                status: "In Bearbeitung",
            }
        }
        api.createOrder(requestData).then(res => {
            closeModal();
            history.push('/orders');
        }).catch(error => {
            setServerError(error.response.data.message);
        })
    }

    return (
        <>
            {modal ?
                <Modal onClose={closeModal}>
                    <img src={img} alt="Bild nicht gefunden" className={styles.modalImage}/>
                    <p>{coffeeSortName}</p>
                    <p>{price}.-</p>
                    <InputField value={amount.value} error={amount.error} id={"amount"} label={"Anzahl"}
                                validationMethod={validateAmount} onChange={handleInput} type={"number"}/>
                    <Button text={"Bestellen"} disabled={isFormValid()} size={"small"} onClick={submitForm}/>
                </Modal>
                : null}


            <div className={styles.wrapper} onClick={() => openModal()}>
                <img src={img} alt="Bild nicht gefunden" className={styles.sortImage}/>
                <p>{coffeeSortName}</p>
                <p>{price}.-</p>
            </div>
            <p className={styles.error}>{serverError}</p>
        </>
    );
}

export default CoffeeSort;
