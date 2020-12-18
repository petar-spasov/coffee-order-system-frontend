const coffeeOrderSystem = {
    baseUrl: 'http://localhost:3000',
    authentication: {
        register: '/auth/register',
        login: '/auth/login',
    },
    coffeeSorts: {
        getAll: '/coffee-sorts'
    },
    statuses: {
        getAll: '/statuses'
    },
    orders: {
        create: '/orders',
        getAll: '/orders',
        getById: (id: number) => `/orders/${id}`,
        delete: (id: number) => `/orders/${id}`,
        update: '/orders',
    },
}

export default coffeeOrderSystem;
