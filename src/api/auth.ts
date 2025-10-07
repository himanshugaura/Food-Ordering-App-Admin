import type { AppDispatch } from "@/store/store";
import { apiConnector } from "@/utils/apiConnector";
import { AuthEndpoints } from "./apis";
import { setUser } from "@/store/features/auth.slice";
import type { User } from "@/types/type";
import toast from "react-hot-toast";

export const login = ( username: string, password: string) => async (dispatch: AppDispatch) : Promise<boolean> => {
    try {
        const res = await apiConnector('POST', AuthEndpoints.LOGIN, { username, password });
        
        if (res.success && res.data) {
            dispatch(setUser(res.data as User));
            toast.success("Logged In");
            return true;
        }
        else {
            toast.error(res.message || "Login failed");
            return false;
        }
    } catch (error) {
        console.error("Login error:", error);
        toast.error("Unable to login");
        return false;
    }
}

export const fetchProfile = () => async (dispatch: AppDispatch) : Promise<boolean> => {
    try {
        const res = await apiConnector('GET', AuthEndpoints.PROFILE);
        
        if (res.success && res.data) {
            dispatch(setUser(res.data as User));
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.error("Fetch profile error:", error);
        return false;
    }
}   