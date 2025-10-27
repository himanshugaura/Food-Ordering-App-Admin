import type { Orders } from "@/types/type";
import OrderCard from "./OrderCard";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/store/hook";
import { fetchAcceptedOrders, fetchPendingOrders } from "@/api/order";
import { connectSocket, disconnectSocket, socket } from "@/lib/socket";
import { addPendingOrders } from "@/store/features/order.slice";
import toast from "react-hot-toast";

const Home = () => {
  const [activeTab, setActiveTab] = useState<"pending" | "accepted">("pending");
  const pendingOrders: Orders[] = useSelector((state: any) => state.order.pendingOrders) || [];
  const acceptedOrders: Orders[] = useSelector((state: any) => state.order.acceptedOrders) || [];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPendingOrders());
    dispatch(fetchAcceptedOrders());
  }, [dispatch]);

  const notifyAudioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      notifyAudioRef.current = new Audio("/notification.mp3");
    }
  }, []);

  useEffect(() => {
    connectSocket();

    socket.emit("joinRoom", `store:orders`);

    const playSound = () => {
      try {
        notifyAudioRef.current?.play();
      } catch (e) {
        console.error("Error playing notification sound:", e);
      }
    };

    const handleOrderPlaced = (payload: any) => {
      dispatch(addPendingOrders(payload.data));
      toast(payload.message);
      playSound();
    };

    socket.on("placeOrder", handleOrderPlaced);

    return () => {
      disconnectSocket();
      socket.off("placeOrder", handleOrderPlaced);
    };
  }, [dispatch]);

  const currentOrders = activeTab === "pending" ? pendingOrders : acceptedOrders;
  const isEmpty = currentOrders.length === 0;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 md:mb-10 text-center">
        Manage Your Orders
      </h1>

      {/* Tabs */}
      <div className="w-full mb-6 sm:mb-8">
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab("pending")}
            className={`flex-1 sm:flex-none px-4 sm:px-8 py-3 font-semibold text-sm sm:text-base border-b-2 ${
              activeTab === "pending"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-gray-400"
            }`}
          >
            Pending Orders
            {pendingOrders.length > 0 && (
              <span className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded-full">
                {pendingOrders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("accepted")}
            className={`flex-1 sm:flex-none px-4 sm:px-8 py-3 font-semibold text-sm sm:text-base border-b-2 ${
              activeTab === "accepted"
                ? "border-green-500 text-green-400"
                : "border-transparent text-gray-400"
            }`}
          >
            Accepted Orders
            {acceptedOrders.length > 0 && (
              <span className="ml-2 px-2 py-1 text-xs bg-green-500 text-white rounded-full">
                {acceptedOrders.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Orders */}
      <div className="w-full">
        {!currentOrders || isEmpty ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {activeTab === "pending" ? "No Pending Orders" : "No Accepted Orders"}
            </h3>
            <p className="text-gray-500">
              {activeTab === "pending"
                ? "All orders have been processed."
                : "Accept some orders to see them here."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {currentOrders.map((order: Orders) =>
              order?._id ? (
                <OrderCard key={order._id} order={order} />
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
