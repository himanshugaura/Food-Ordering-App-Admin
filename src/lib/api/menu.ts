import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { MenuEndpoints } from "../apis";

export const uploadProduct = (formData: {
  name: string;
  description: string;
  categoryId: string;
  price: string;
  foodType: string;
  image: File;
}) => async () => {
  try {
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("description", formData.description);
    fd.append("categoryId", formData.categoryId);
    fd.append("price", formData.price);
    fd.append("foodType", formData.foodType);
    fd.append("image", formData.image);

    const res = await apiConnector(
      "POST",
      MenuEndpoints.UPLOAD_PRODUCT_API,
      fd
    );

    if (res.success) {
      toast.success("Uploaded!");
      return true;
    } else {
      toast.error(res.message || "Uploading failed");
      return false;
    }
  } catch (err) {
    toast.error("Something went wrong");
    console.error("Product Upload error:", err);
    return false;
  }
};

export const addCategory = (formData:FormData) => async () => {
  try {
    const res = await apiConnector(
      "POST",
      MenuEndpoints.ADD_CATEGORY_API,
      formData
    );

    if (res.success) {
      toast.success("Uploaded! 🎉");
      return true;
    }
  else {
      toast.error(res.message || "Failed");
      return false;
    }
  } catch (err) {
    toast.error("Something went wrong");
    console.error("Category Upload error:", err);
    return false;
  }
};

export const getAllCategories = () => async () => {
  try {
    const res = await apiConnector("GET", MenuEndpoints.GET_CATEGORIES_API);

    console.log(res);
    
    if (res.success) {
      return true;
    } else {
      toast.error("Unable to fetch data");
      return false;
    }
  } catch (err) {
    toast.error("Something went wrong");
    console.error("Get Categories error:", err);
    return false;
  }
};

export const getAllProducts = () => async () => {
  try {
    const res = await apiConnector("GET", MenuEndpoints.GET_PRODUCTS_API);

    console.log(res);
    
    if (res.success) {
      return true;
    } else {
      toast.error("Unable to fetch data");
      return false;
    }
  } catch (err) {
    toast.error("Something went wrong");
    console.error("Get Products error:", err);
    return false;
  }
};
