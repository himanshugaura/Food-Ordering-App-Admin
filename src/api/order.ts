import type { AppDispatch } from "@/store/store";
import { apiConnector } from "@/utils/apiConnector";
import { OrderEndpoints } from "./apis";
import { setAcceptedOrders, setPendingOrders } from "@/store/features/order.slice";
import type { Orders, Stats } from "@/types/type";
import toast from "react-hot-toast";
import { setStats } from "@/store/features/analytics";

export const fetchPendingOrders =
  () =>
  async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      const res = await apiConnector("GET", OrderEndpoints.GET_PENDING_ORDERS);
      console.log("pending orders" , res);
      
      if (res.success && res.data) {
        dispatch(setPendingOrders(res.data as Orders[]));
        return true;
      } else {
        toast.error("Failed to fetch orders");
        return false;
      }
    } catch (error) {
      console.error("Fetch orders error:", error);
      toast.error("Failed to fetch orders");
      return false;
    }
  };

export const fetchAcceptedOrders =
  () =>
  async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      const res = await apiConnector("GET", OrderEndpoints.GET_ACCEPTED_ORDERS);
      console.log("Accepted Orders:", res);
      if (res.success && res.data) {
        dispatch(setAcceptedOrders(res.data as Orders[]));
        return true;
      } else {
        toast.error("Failed to fetch orders");
        return false;
      }
    } catch (error) {
      console.error("Fetch orders error:", error);
      toast.error("Failed to fetch orders");
      return false;
    }
  };

export const acceptOrder = (orderId: string) => async (): Promise<boolean> => {
  try {
    const res = await apiConnector(
      "POST",
      OrderEndpoints.ACCEPT_ORDER(orderId)
    );

    if (res.success) {
      toast.success("Order accepted");
      return true;
    } else {
      toast.error("Failed to accept order");
      return false;
    }
  } catch (error) {
    console.error("Accept order error:", error);
    toast.error("Failed to accept order");
    return false; 
  }
};

export const rejectOrder = (orderId: string) => async (): Promise<boolean> => {
  try {
    const res = await apiConnector(
      "POST",
      OrderEndpoints.REJECT_ORDER(orderId)
    );
    console.log(res);
    
    if (res.success) {
      toast.success("Order rejected");
      return true;
    } else {
      toast.error("Failed to reject order");
      return false;
    }
  } catch (error) {
    console.error("Reject order error:", error);
    toast.error("Failed to reject order");
    return false;
  }
};

export const markOrderDelivered =
  (orderId: string) => async (): Promise<boolean> => {
    try {
      const res = await apiConnector(
        "POST",
        OrderEndpoints.MARK_ORDER_DELIVERED(orderId)
      );      
      if (res.success) {
        toast.success("Order marked as delivered");
        return true;
      } else {
        toast.error("Failed to mark order as delivered");
        return false;
      }
    } catch (error) {
      console.error("Mark order delivered error:", error);
      toast.error("Failed to mark order as delivered");
      return false;
    }
  };

export const getMonthlyStats = (month: number) => async (dispatch : AppDispatch):Promise<boolean> => {
  try {
    const res = await apiConnector(
      "GET",
      `${OrderEndpoints.GET_MONTHLY_STATS}?month=${month}`
    );
    
    if (res.success && res.data) {
      dispatch(setStats(res.data as Stats));
      return true;
    } 
    else {
      toast.error("Failed to fetch monthly stats");
      return false;
    }
  }
  catch (error) {
    console.error("Get monthly stats error:", error);
    toast.error("Failed to fetch monthly stats");
    return false;
  }
};