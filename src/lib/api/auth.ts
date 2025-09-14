import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { AuthEndpoints } from "../apis";
import { clearAdmin, setAdmin } from "../store/features/auth/auth.slice";
import { Admin } from "@/types/type";

export const login = (username: string, password: string) => async () => {
  try {
    const res = await apiConnector("POST", AuthEndpoints.LOGIN_API, {
      username,
      password,
    });
    
    if (res.success) {
      toast.success("Logged in!");
      return true;
    } 

    else {
      toast.error(res.message || "Login failed");
      return false;
    }
  } catch (err) {
    toast.error("Something went wrong");
    console.error("Login error:", err);
    return false;
  }
};

export const getAdminData = () => async () => {
  try {
    const res = await apiConnector("GET", AuthEndpoints.GET_DATA_API);
    
    if (res.success) {
      setAdmin(res.data as Admin);
      return true;
    } 

    else {
      return false;
    }
  } catch (err) {
    console.error("Get Admin Data error:", err);
    return null;
  }
};

export const logout = () => async () => {
  try {
    const res = await apiConnector("POST", AuthEndpoints.LOGOUT_API);
    
    if (res.success) {
      clearAdmin();
      toast.success("Logged out!");
      return true;
    } 

    else {
      toast.error(res.message || "Logout failed");
      return false;
    }
  } catch (err) {
    toast.error("Something went wrong");
    console.error("Logout error:", err);
    return false;
  }
};

