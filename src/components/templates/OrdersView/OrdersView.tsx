import React, {useEffect, useState} from 'react';
import CoffeeOrderSystemApi from "../../../api/coffee-order-system-api";
import Card from "../../atoms/Card/Card";
import Header, {Tag} from "../../atoms/Header/Header";
import styles from "./OrdersView.module.scss";
import OrderDetails from "../../molecules/OrderDetails/OrderDetails";
import Button from "../../atoms/Button/Button";
import Modal from "../../organisms/Modal/Modal";


export type Orders = {
    orderId: number,
    amount: number,
    user: {
        id: number,
        name: string,
        lastName: string,
        email: string,
    },
    status: {
        statusId: number,
        status: string,
    },
    sort: {
        sortId: number,
        sortName: string,
        price: number,
        imageLink: string,
    },
}

const OrdersView = () => {
    const [orders, setOrders] = useState<Orders[]>([]);
    const api = new CoffeeOrderSystemApi();
    const [modal, setModal] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState<number>(0);

    useEffect(() => {
        api.getAllOrders().then(res => {
            setOrders(res.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const triggerConfirmation = (orderId: number) => {
        setModal(true);
        setOrderToDelete(orderId);
    }

    const closeModal = () => {
        setModal(false);
    }

    const deleteOrder = () => {
        api.deleteOrder(orderToDelete).then(res => res).catch(error => error);
        setModal(false);
        setOrders(orders.filter(order => order.orderId !== orderToDelete));
    }

    return (
        <>
            {modal ?
                <Modal onClose={closeModal}>
                    <Header text={"Sind Sie sicher, dass Sie diese Bestellung permanen löschen möchten ?"}
                            Element={Tag.H2}/>
                    <div className={styles.buttonWrapper}>
                        <Button text={"Ja"} disabled={false} size={"medium"} onClick={deleteOrder}/>
                        <Button text={"Nein"} disabled={false} size={"medium"} onClick={closeModal}/>
                    </div>
                </Modal>
                : null}
            <Header text={"Alle Bestellungen"} Element={Tag.H1}/>
            <div className={styles.ordersWrapper}>
                {
                    orders.map(order => {
                            return <Card key={order.orderId}>
                                <Header text={`Bestellung ${order.orderId}`} Element={Tag.H3}/>
                                <img src={order.sort.imageLink} alt="Bild nicht gefunden" className={styles.orderImage}/>
                                <Header text={order.sort.sortName} Element={Tag.H5}/>
                                <OrderDetails order={order}/>
                                <Button text={"Löschen"} onClick={() => triggerConfirmation(order.orderId)} disabled={false}
                                        size={"small"}/>
                            </Card>
                        }
                    )
                }
            </div>
        </>
    );
}

export default OrdersView;
