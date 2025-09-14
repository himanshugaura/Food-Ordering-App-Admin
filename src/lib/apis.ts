const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

// AUTH ENDPOINTS
export const AuthEndpoints = {
  LOGIN_API: BASE_URL + "/admin/auth/login",
  LOGOUT_API: BASE_URL + "/admin/auth/logout",
  GET_DATA_API: BASE_URL + "/admin/auth/profile",
};


//MENU ENDPOINTS
export const MenuEndpoints = {
  ADD_CATEGORY_API: BASE_URL + "/menu/add-category",
  GET_CATEGORIES_API: BASE_URL + "/menu/get-categories",
  GET_PRODUCTS_API: BASE_URL + "/menu/get-products",
  UPLOAD_PRODUCT_API: BASE_URL + "/menu/upload-product"
};


