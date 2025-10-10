import { setProducts } from "@/store/features/product.slice";
import type { AppDispatch } from "@/store/store";
import type { Product } from "@/types/type";
import { apiConnector } from "@/utils/apiConnector";
import { ProductEndpoints } from "./apis";

export const fetchAllProducts = () => async (dispatch: AppDispatch) : Promise<boolean> => {
    try {
        const res = await apiConnector('GET', ProductEndpoints.GET_ALL_PRODUCTS);
        
        if (res.success && res.data) {
            dispatch(setProducts(res.data as Product[]));
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.error("Fetch products error:", error);
        return false;
    }
}   
