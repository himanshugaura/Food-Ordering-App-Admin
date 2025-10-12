import type { AppDispatch } from "@/store/store";
import { apiConnector } from "@/utils/apiConnector";
import { CategoryEndpoints } from "./apis";
import type { Category } from "@/types/type";
import { addCategory, removeCategory, setCategories, setSelectedCategory } from "@/store/features/category";
import toast from "react-hot-toast";

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

export const fetchCategoryById = (id: string) => async (dispatch: AppDispatch) : Promise<boolean> => {
    try {
        const res = await apiConnector('GET', CategoryEndpoints.GET_CATEGORY_BY_ID(id));        
        if (res.success && res.data) {
            dispatch(setSelectedCategory(res.data as Category));
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.error("Fetch category by ID error:", error);
        return false;
    }
}

export const uploadCategory = (formData: FormData) => async (dispatch : AppDispatch) : Promise<boolean> => {
    const toastId = toast.loading("Uploading...");
    try {
        const res = await apiConnector('POST', CategoryEndpoints.CREATE_CATEGORY, formData );        

        if (res.success && res.data) {
            dispatch(addCategory(res.data as Category));
            toast.dismiss(toastId);
            toast.success("Category Added");
            return true;
        }
        else {
            toast.dismiss(toastId);
            toast.error("Upload Failed");
            return false;
        }
    } catch (error) {
        toast.dismiss(toastId);
        console.error("Upload category error:", error);
        toast.error("Upload Failed");
        return false;
    }
}

export const updateCategory = (id: string, formData: FormData) => async () : Promise<boolean> => {
    const toastId = toast.loading("Updating...");
    try {
        const res = await apiConnector('PATCH', CategoryEndpoints.UPDATE_CATEGORY(id), formData );        

        if (res.success && res.data) {
            toast.dismiss(toastId);
            toast.success("Category Updated");
            return true;
        }
        else {
            toast.dismiss(toastId);
            toast.error("Update Failed");
            return false;
        }
    } catch (error) {
        console.error("Update category error:", error);
        toast.dismiss(toastId);
        toast.error("Something went wrong");
        return false;
    }
}

export const deleteCategory = (id: string) => async (dispatch : AppDispatch) : Promise<boolean> => {
    const toastId = toast.loading("Deleting...");
    try {
        const res = await apiConnector('DELETE', CategoryEndpoints.DELETE_CATEGORY(id) );
        if (res.success) {
            toast.dismiss(toastId);
            toast.success("Category Deleted");
            dispatch(removeCategory(id));
            return true;
        }
        else {
            toast.dismiss(toastId);
            toast.error("Delete Failed");
            return false;
        }  
    } catch (error) {
        toast.dismiss(toastId);
        console.error("Delete category error:", error);
        toast.error("Something went wrong");
        return false;
    }
}