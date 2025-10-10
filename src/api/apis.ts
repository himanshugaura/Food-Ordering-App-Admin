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
    GET_PRODUCT_BY_ID: (productId: string) => `${BASE_URL}/menu/get-product/${productId}`,
    UPDATE_PRODUCT: (productId: string) => `${BASE_URL}/menu/update/product/${productId}`,
    DELETE_PRODUCT: (productId: string) => `${BASE_URL}/menu/delete/product/${productId}`,
}

export const CategoryEndpoints = {
    CREATE_CATEGORY: `${BASE_URL}/menu/add/category`,
    GET_ALL_CATEGORIES: `${BASE_URL}/menu/get-categories`,
    GET_PRODUCT_BY_CATEGORY: (categoryId : string) => `${BASE_URL}/menu/get-products-by-category/${categoryId}`,
    UPDATE_CATEGORY: (categoryId: string) => `${BASE_URL}/menu/update/category/${categoryId}`,
}