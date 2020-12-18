import HttpClient from './http-client';
import coffeeOrderSystem from "../constants/api-constants";
import {CoffeeSortType} from "../components/organisms/CoffeeSorts/CoffeeSorts";
import {Orders} from "../components/templates/OrdersView/OrdersView";
import {Status} from "../components/molecules/OrderDetails/OrderDetails";

class CoffeeOrderSystemApi extends HttpClient {

    public constructor() {
        super(coffeeOrderSystem.baseUrl);
    }

    public register = (data: {}) => this.api.post(coffeeOrderSystem.authentication.register, data);

    public login = (data: {}) => this.api.post(coffeeOrderSystem.authentication.login, data);

    public getAllSorts = () => this.api.get<CoffeeSortType[]>(coffeeOrderSystem.coffeeSorts.getAll);

    public getAllStatuses = () => this.api.get<Status[]>(coffeeOrderSystem.statuses.getAll);

    public getAllOrders = () => this.api.get<Orders[]>(coffeeOrderSystem.orders.getAll);

    public createOrder = (data: {}) => this.api.post(coffeeOrderSystem.orders.create, data);

    public updateOrder = (data: {}) => this.api.put(coffeeOrderSystem.orders.update, data);

    public deleteOrder = (id: number) => this.api.delete(coffeeOrderSystem.orders.delete(id));
}

export default CoffeeOrderSystemApi;
