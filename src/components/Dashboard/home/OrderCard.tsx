import type { PendingOrder } from "@/types/type";
import React, { useState } from "react";

interface OrderCardProps {
  order: PendingOrder;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [showAll, setShowAll] = useState(false);
  const displayItems = showAll ? order.orderItems : order.orderItems.slice(0, 2);
  const hasMoreItems = order.orderItems.length > 2;

  return (
    <div className="bg-white p-5 sm:p-6 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 w-full max-w-full relative">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-200 gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Order</span>
            <h2 className="text-lg sm:text-xl text-gray-900 font-bold">#{order.orderNo}</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            <p className="text-sm sm:text-base text-gray-700 font-medium truncate">{order.user.name}</p>
          </div>
        </div>
        <div className="relative">
          <img 
            src={order.user.avatar} 
            alt={order.user.name} 
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 border-amber-400 object-cover flex-shrink-0 shadow-sm"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
      </div>

      {/* Order Items - Fixed Height Container */}
      <div className="mb-5 h-[180px] sm:h-[200px] relative">
        <div className={`h-full ${showAll ? 'overflow-y-auto pb-10 pr-1' : 'overflow-hidden'} scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent`}>
          <ul className="space-y-2">
            {displayItems.map((item) => (
              <li 
                key={item.product._id} 
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all duration-200 group"
              >
                <div className="relative">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border-2 border-gray-100 flex-shrink-0 group-hover:border-amber-300 transition-colors duration-200"
                  />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                    {item.quantity}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-semibold text-gray-900  mb-0.5">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">Quantity: {item.quantity}</p>
                </div>
                <span className="text-sm sm:text-base font-bold text-gray-900 flex-shrink-0 bg-gray-50 px-3 py-1.5 rounded-lg">
                  ₹{item.price}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* See More/Less Button - Fixed at bottom */}
        {hasMoreItems && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/95 to-transparent pt-4 pb-1">
            {!showAll ? (
              <button
                onClick={() => setShowAll(true)}
                className="w-full text-sm font-semibold text-blue-600 hover:text-blue-700 py-2.5 hover:bg-blue-50 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>See {order.orderItems.length - 2} More Item{order.orderItems.length - 2 > 1 ? 's' : ''}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => setShowAll(false)}
                className="w-full text-sm font-semibold text-blue-600 hover:text-blue-700 py-2.5 hover:bg-blue-50 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Show Less</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Total Amount */}
      <div className="flex justify-between items-center py-3.5 sm:py-4 px-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl mb-5 border border-amber-200">
        <span className="text-sm sm:text-base font-bold text-gray-700 uppercase tracking-wide">Total Amount</span>
        <span className="text-lg sm:text-xl font-extrabold text-gray-900">₹{order.totalAmount}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold text-sm sm:text-base py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0">
          Accept
        </button>
        <button className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-sm sm:text-base py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0">
          Reject
        </button>
      </div>
    </div>
  );
};

export default OrderCard;