import type { AppDispatch } from "@/store/store";
import { apiConnector } from "@/utils/apiConnector";
import { StoreEndpoints } from "./apis";
import { setStore } from "@/store/features/store.slice";
import type { Store } from "@/types/type";
import toast from "react-hot-toast";


export const fetchStore = () => async (dispatch: AppDispatch) : Promise<boolean> => {
    try {
        const res = await apiConnector('GET', StoreEndpoints.GET_STORE);        
        if (res.success && res.data) {
            dispatch(setStore(res.data as Store));
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.error("Fetch store error:", error);
        return false;
    }
}   

export const updateStore = (formData: FormData) => async () : Promise<boolean> => {
    const toastId = toast.loading("Updating...");
    try {
        const res = await apiConnector('PATCH', StoreEndpoints.UPDATE_STORE, formData);
        if (res.success) {
            toast.dismiss(toastId);
            toast.success("Store updated");
            return true;
        }
        else {
            toast.dismiss(toastId);
            toast.error(res.message || "Update failed");
            return false;
        }
    } catch (error) {
        console.error("Update store error:", error);
        toast.dismiss(toastId);
        toast.error("Unable to update store");
        return false;
    }
}

export const toggleStoreStatus = () => async () : Promise<boolean> => { 
    try {
        const res = await apiConnector('PATCH', StoreEndpoints.STORE_OPEN_TOGGLE);
        if (res.success) {
            toast.success("Status updated");
            return true;
        }
        else {
            toast.error(res.message || "Update failed");
            return false;
        }
    } catch (error) {
        console.error("Toggle store status error:", error);
        toast.error("Something went wrong");
        return false;
    }
}

export const resetOrderCounter = () => async () : Promise<boolean> => { 
    try {
        const res = await apiConnector('PATCH', StoreEndpoints.RESET_ORDER_COUNTER);
        if (res.success) {
            toast.success("Counter reseted");
            return true;
        }
        else {
            toast.error(res.message || "Reset failed");
            return false;
        }
    } catch (error) {
        console.error("Reset order counter error:", error);
        toast.error("Something went wrong");
        return false;
    }
}