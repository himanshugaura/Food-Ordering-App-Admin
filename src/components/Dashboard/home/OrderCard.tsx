import { acceptOrder, rejectOrder, markOrderDelivered } from "@/api/order";
import { addAcceptedOrders } from "@/store/features/order.slice";
import { useAppDispatch } from "@/store/hook";
import type { Orders } from "@/types/type";
import { Beef, Leaf } from "lucide-react";
import React, { useState } from "react";

interface OrderCardProps {
  order: Orders;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [showAll, setShowAll] = useState(false);
  const displayItems = showAll ? order.orderItems : order.orderItems.slice(0, 3);
  const hasMoreItems = order.orderItems.length > 3;

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  // Convert UTC to Indian Time
  const formatIndianTime = (utcDate: string) => {
    const date = new Date(utcDate);
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    };
    return date.toLocaleTimeString('en-IN', options);
  };

  const formatIndianDate = (utcDate: string) => {
    const date = new Date(utcDate);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'Asia/Kolkata'
    };
    return date.toLocaleDateString('en-IN', options);
  };

  const handleAccept = async () => {
    try {
      setLoading(true);
      const res = await dispatch(acceptOrder(order._id)); 
      if (res) {
        dispatch(addAcceptedOrders(order));
      } 
    } catch (error) {
      console.error("Error accepting order:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleReject = async () => {
    try {
      setLoading(true);
      await dispatch(rejectOrder(order._id));
    } catch (error) {
      console.error("Error rejecting order:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleMarkAsPaidAndDelivered = async () => {
    try {
      setLoading(true);
      await dispatch(markOrderDelivered(order._id));
    } catch (error) {
      console.error("Error marking as paid & delivered:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-neutral-900 p-6 border border-gray-700 rounded-xl shadow-lg hover:shadow-xl hover:border-gray-600 transition-all duration-300 w-full max-w-full h-[560px] flex flex-col">
      {/* Header Section with Payment Status and Time */}
      <div className="flex-shrink-0">
        {/* Payment Status Bar */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${order.isPaid ? 'bg-green-500' : 'bg-amber-500'}`}></div>
            <span className={`text-xs font-semibold ${order.isPaid ? 'text-green-400' : 'text-amber-400'}`}>
              {order.isPaid ? 'PAID' : 'UNPAID'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium bg-gray-800 px-2 py-1 rounded-md border border-gray-700">
              {order.paymentMethod}
            </span>
          </div>
        </div>

        {/* Order Info and Time */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700 gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Order</span>
              <h2 className="text-xl text-white font-semibold">#{order.orderNo}</h2>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-base text-gray-200 font-medium truncate">{order.user.name.toUpperCase()}</p>
            </div>
            {/* Order Time */}
            <div className="flex items-center gap-1 mt-2">
              <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-gray-400">
                {formatIndianTime(order.createdAt.toString())} • {formatIndianDate(order.createdAt.toString())}
              </span>
            </div>
          </div>
          <div>
            <img 
              src={order.user.avatar} 
              alt={order.user.name} 
              className="w-12 h-12 rounded-full border-2 border-gray-600 object-cover flex-shrink-0"
            />
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="flex-1 min-h-0 mb-4">
        <div className={`h-full ${showAll ? 'overflow-y-auto' : 'overflow-hidden'} pr-2`}>
          <div className="space-y-3">
            {displayItems.map((item) => (
              <div
                key={item.product._id} 
                className="flex items-center gap-4 p-3 rounded-lg bg-neutral-800 border border-gray-700 hover:border-gray-600 transition-colors duration-200"
              >
                <div className="relative flex-shrink-0">
                  <img 
                    src={item.product.image.url} 
                    alt={item.product.name} 
                    className="w-12 h-12 rounded-lg object-cover border border-gray-600"
                  />
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-amber-600 text-white text-xs font-medium rounded-full flex items-center justify-center">
                    {item.quantity}
                  </div>  
                  <div className={`absolute -bottom-2 -left-2 w-5 h-5 rounded-sm   ${item.product.foodType === 'VEG' ? 'bg-emerald-600' : 'bg-red-600'}  flex items-center justify-center`}>
                   {item.product.foodType === 'VEG' ? <Leaf className="text-white h-3 w-3" /> : <Beef className="text-white h-3 w-3"/>}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white mb-1 truncate">
                    {item.product.name}
                  </p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-gray-400">Qty: {item.quantity}</span>
                    <span className="text-emerald-400">₹{item.product.price} each</span>
                  </div>
                </div>
                
                <span className="text-sm font-semibold text-white bg-emerald-700 px-3 py-1.5 rounded-lg flex-shrink-0">
                  ₹{item.product.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* See More/Less Button */}
      {hasMoreItems && (
        <div className="mb-4 flex-shrink-0">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full text-sm font-medium text-blue-400 hover:text-blue-300 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-1 border border-gray-700"
          >
            <span>
              {showAll ? 'Show Less' : `See ${order.orderItems.length - 3} More Item${order.orderItems.length - 3 > 1 ? 's' : ''}`}
            </span>
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {/* Total Amount */}
      <div className="flex justify-between items-center py-3 px-4 bg-neutral-800 rounded-lg mb-4 border border-gray-700 flex-shrink-0">
        <span className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Total Amount</span>
        <span className="text-lg font-bold text-white">₹{order.totalAmount}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 flex-shrink-0">
        {order.status === "PENDING" && (
          <>
            <button 
              className={`flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95 cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={loading}
              onClick={handleAccept}
            >
              {loading ? 'Accepting...' : 'Accept'} 
            </button>
            <button 
              className={`flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95 cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={loading}
              onClick={handleReject}
            >
              {loading ? 'Rejecting...' : 'Reject'}
            </button>
          </>
        )}
        {order.status === "COOKING" && (
          <>
            <button
              className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95 cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={loading}
              onClick={handleMarkAsPaidAndDelivered}
            >
              {loading ? 'Processing...' : "Paid & Delivered"}
            </button>
            <button
              className={`flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95 cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={loading}
              onClick={handleReject}
            >
              {loading ? 'Cancelling...' : "Cancel"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderCard;