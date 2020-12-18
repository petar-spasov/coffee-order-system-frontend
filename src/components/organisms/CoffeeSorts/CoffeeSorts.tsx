import React, {useEffect, useState} from "react";
import styles from './CoffeeSorts.module.scss';
import CoffeeOrderSystemApi from "../../../api/coffee-order-system-api";
import CoffeeSort from "../../molecules/CoffeeSort/CoffeeSort";
import {AxiosResponse} from "axios";
import {log} from "util";
import img from '../../../static/images/nespresso.png'
import img1 from '../../../static/images/nespresso.png'
import {useHistory} from "react-router-dom";

type Props = {}

export type CoffeeSortType = {
    sortId: number,
    sortName: string,
    price: number,
    imageLink: string
}

const CoffeeSorts: React.FC<Props> = ({}) => {

    const [coffeeSorts, setCoffeeSorts] = useState<CoffeeSortType[]>([]);
    const api = new CoffeeOrderSystemApi();
    const history = useHistory();


    useEffect(() => {
        api.getAllSorts().then(res => {
            setCoffeeSorts(res.data);
        }).catch(error => {
            if (error.response.status === 401){
                history.push("/");
            }
        });
    }, [])

    return (
        <div className={styles.sortsWrapper}>
            {
                coffeeSorts.map(coffeeSort =>
                    <CoffeeSort coffeeSortName={coffeeSort.sortName} img={coffeeSort.imageLink}
                                price={coffeeSort.price} coffeeSortId={coffeeSort.sortId}
                    />
                )
            }
        </div>
    );
}

export default CoffeeSorts;
