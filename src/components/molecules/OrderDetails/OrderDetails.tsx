import React, {useEffect, useState} from "react";
import styles from './OrderDetails.module.scss';
import CoffeeOrderSystemApi from "../../../api/coffee-order-system-api";
import {Orders} from "../../templates/OrdersView/OrdersView";

type Props = {
    order: Orders
}

export type Status = {
    statusId: number,
    status: string,
}

const OrderDetails: React.FC<Props> = ({ order}) => {

    const [statuses, setStatuses] = useState<Status[]>([]);
    const [currentStatus, setCurrentStatus] = useState<Status>(order.status);
    const api = new CoffeeOrderSystemApi();

    useEffect(() => {
        api.getAllStatuses().then(res => {
            setStatuses(res.data);
        }).catch(error => error);
    }, [])

    const changeStatus = () => {
        let nextStatusIndex = statuses.findIndex(status => status.status === currentStatus.status) + 1;
        if (nextStatusIndex === statuses.length) {
            nextStatusIndex = 0;
        }
        setCurrentStatus(statuses[nextStatusIndex]);
        const updatedOrder = {
            ...order,
            status: { ...statuses[nextStatusIndex]}
        }
        api.updateOrder(updatedOrder).then(res=>res).catch(error => error);
    }

    return (
        <div className={styles.detailsWrapper}>
            <div className={styles.detailsRow}>
                <p>Anzahl: </p>
                <p>{order.amount}</p>
            </div>
            <div className={styles.detailsRow}>
                <p>Benutzer: </p>
                <p>{`${order.user.name} ${order.user.lastName}`}</p>
            </div>
            <div className={styles.detailsRow}>
                <p>Status: </p>
                <p onClick={() => changeStatus()} className={styles.statusButton}>{currentStatus.status}</p>
            </div>
        </div>
    );
}

export default OrderDetails;
