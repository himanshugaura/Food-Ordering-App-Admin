import { addProduct, setProducts, setSelectedProduct } from "@/store/features/product.slice";
import type { AppDispatch } from "@/store/store";
import type { Product } from "@/types/type";
import { apiConnector } from "@/utils/apiConnector";
import { ProductEndpoints } from "./apis";
import toast from "react-hot-toast";

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

export const fetchProductById = (id: string) => async (dispatch: AppDispatch) : Promise<boolean> => {
    try {
        const res = await apiConnector('GET', ProductEndpoints.GET_PRODUCT_BY_ID(id));        
        if (res.success && res.data) {
            dispatch(setSelectedProduct(res.data as Product));
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.error("Fetch product by ID error:", error);
        return false;
    }
}

export const uploadProduct = (formData: FormData) => async (dispatch : AppDispatch) : Promise<boolean> => {
    const toastId = toast.loading("Uploading...");
    try {
        const res = await apiConnector('POST', ProductEndpoints.CREATE_PRODUCT, formData );        

        if (res.success && res.data) {
            toast.dismiss(toastId);
            toast.success("Product Uploaded");
            dispatch(addProduct(res.data as Product));
            console.log(res.data);
            
            return true;
        }
        else {
            toast.dismiss(toastId);
            toast.error("Upload Failed");
            return false;
        }
    } catch (error) {
        console.error("Upload product error:", error);
        toast.dismiss(toastId);
        toast.error("Something went wrong");
        return false;
    }
}

export const updateProduct = (id: string, formData: FormData) => async () : Promise<boolean> => {
    const toastId = toast.loading("Updating...");
    try {
        const res = await apiConnector('PATCH', ProductEndpoints.UPDATE_PRODUCT(id), formData );
        if (res.success) {
            toast.dismiss(toastId);
            toast.success("Product Updated");
            return true;
        }
        else {
            toast.dismiss(toastId);
            toast.error("Update Failed");
            return false;
        }  
    } catch (error) {
        console.error("Update product error:", error);
        toast.dismiss(toastId);
        toast.error("Something went wrong");
        return false;
    }
}

export const deleteProduct = (id: string) => async () : Promise<boolean> => {
    const toastId = toast.loading("Deleting...");
    try {
        const res = await apiConnector('DELETE', ProductEndpoints.DELETE_PRODUCT(id) );
        if (res.success) {
            toast.dismiss(toastId);
            toast.success("Product Deleted");
            return true;
        }
        else {
            toast.dismiss(toastId);
            toast.error("Delete Failed");
            return false;
        }  
    } catch (error) {
        console.error("Delete product error:", error);
        toast.dismiss(toastId);
        toast.error("Something went wrong");
        return false;
    }
}   

