const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AuthEndpoints = {
    LOGIN: `${BASE_URL}/admin/auth/login`,
    REGISTER: `${BASE_URL}/admin/auth/register`,
    PROFILE: `${BASE_URL}/admin/auth/profile`,
    LOGOUT: `${BASE_URL}/admin/auth/logout`,
}

export const StoreEndpoints = {
    GET_STORE: `${BASE_URL}/store/details`,
    UPDATE_STORE: `${BASE_URL}/store/update`,
    STORE_OPEN_TOGGLE: `${BASE_URL}/store/toggle/status`,
    RESET_ORDER_COUNTER: `${BASE_URL}/store/reset/order-counter`,
}

export const ProductEndpoints = {
    CREATE_PRODUCT: `${BASE_URL}/menu/add/product`,
    GET_ALL_PRODUCTS: `${BASE_URL}/menu/get-products`,
    GET_PRODUCT_BY_ID: (id: string) => `${BASE_URL}/menu/get-product/${id}`,
    UPDATE_PRODUCT: (id: string) => `${BASE_URL}/menu/update/product/${id}`,
    DELETE_PRODUCT: (id: string) => `${BASE_URL}/menu/delete/product/${id}`,
}

export const CategoryEndpoints = {
    CREATE_CATEGORY: `${BASE_URL}/menu/add/category`,
    GET_ALL_CATEGORIES: `${BASE_URL}/menu/get-categories`,
    GET_PRODUCT_BY_CATEGORY: (id : string) => `${BASE_URL}/menu/get-products-by-category/${id}`,
    GET_CATEGORY_BY_ID: (id: string) => `${BASE_URL}/menu/get-category/${id}`,
    UPDATE_CATEGORY: (id: string) => `${BASE_URL}/menu/update/category/${id}`,
    DELETE_CATEGORY: (id: string) => `${BASE_URL}/menu/delete/category/${id}`,
}

export const OrderEndpoints = {
    GET_PENDING_ORDERS: `${BASE_URL}/order/pending`,
    GET_ACCEPTED_ORDERS: `${BASE_URL}/order/accepted`,
    ACCEPT_ORDER: (id: string) => `${BASE_URL}/order/accept/${id}`,
    REJECT_ORDER: (id: string) => `${BASE_URL}/order/reject/${id}`,
    MARK_ORDER_DELIVERED: (id: string) => `${BASE_URL}/order/delivered/${id}`,
    GET_MONTHLY_ORDERS: `${BASE_URL}/order/search/monthly`,
    GET_ORDERS_BY_DATE: `${BASE_URL}/order/search/date`,
    GET_ORDERS_BY_CUSTOMER_NAME: `${BASE_URL}/order/search/name`,
}