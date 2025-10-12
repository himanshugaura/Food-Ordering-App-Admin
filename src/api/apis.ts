const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AuthEndpoints = {
    LOGIN: `${BASE_URL}/admin/auth/login`,
    REGISTER: `${BASE_URL}/admin/auth/register`,
    PROFILE: `${BASE_URL}/admin/auth/profile`,
    LOGOUT: `${BASE_URL}/admin/auth/logout`,
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