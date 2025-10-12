import type { AppDispatch } from "@/store/store";
import { apiConnector } from "@/utils/apiConnector";
import { CategoryEndpoints } from "./apis";
import type { Category } from "@/types/type";
import { setCategories } from "@/store/features/category";

export const fetchAllCategories = () => async (dispatch: AppDispatch) : Promise<boolean> => {
    try {
        const res = await apiConnector('GET', CategoryEndpoints.GET_ALL_CATEGORIES);
        
        if (res.success && res.data) {
            dispatch(setCategories(res.data as Category[]));
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.error("Fetch categories error:", error);
        return false;
    }
}   