const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AuthEndpoints = {
    LOGIN: `${BASE_URL}/admin/auth/login`,
    REGISTER: `${BASE_URL}/admin/auth/register`,
    PROFILE: `${BASE_URL}/admin/auth/profile`,
    LOGOUT: `${BASE_URL}/admin/auth/logout`,
}
