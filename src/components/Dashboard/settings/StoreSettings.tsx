import React, { useEffect, useState } from "react";
import { RotateCcw, Hash } from "lucide-react";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/store/hook";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { fetchStore } from "@/api/store";
import { resetOrderCounter, toggleStoreStatus } from "@/api/store";

// Interfaces

export interface StoreFormData {
  name: string;
  address: string;
  imageFile: File | null;
  imageUrl: string | null;
}
export const StoreSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const store = useSelector((state: RootState) => state.store.store);

  const [isStoreOpen, setIsStoreOpen] = useState(store?.isOpen);
  const [orderCounter, setOrderCounter] = useState(store?.orderCounter);

  useEffect(() => {
    const fetchData = async () => {
      if (!store) {
        try {
          await dispatch(fetchStore());
        } catch (error) {
          console.error("Error fetching store:", error);
          toast.error("Something went wrong");
        }
      }
    };
    fetchData();
  }, [store, dispatch]);


  useEffect(() => {
    if (store) {
      setOrderCounter(store.orderCounter);
      setIsStoreOpen(store.isOpen);
    }
  }, [store]);

  
  const handleToggleStore = async () => {
    const newStatus = !isStoreOpen;
    setIsStoreOpen(newStatus);
    try {
      await dispatch(toggleStoreStatus());
    } catch (error) {
      console.error("Error toggling store status:", error);
      toast.error("Something went wrong");
    }
  };

  const handleResetCounter = async () => {
    setOrderCounter(0);
    try {
        await dispatch(resetOrderCounter());
    } catch (error) {
        console.error("Error resetting order counter:", error);
        toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 w-full">
      <div className="max-w-2xl mx-auto overflow-hidden">
        {/* Header */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-700">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-200/50 bg-clip-text text-transparent mb-2">
            Store Details
          </h1>
        </div>

        {/* Store Controls - Outside Form */}
        <div className="mb-6 space-y-4 animate-in fade-in slide-in-from-left duration-700">
          {/* Store Toggle */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isStoreOpen ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Store Status</h3>
                  <p className="text-sm text-gray-400">
                    Store is currently {isStoreOpen ? 'accepting' : 'not accepting'} orders
                  </p>
                </div>
              </div>
              <button
                onClick={handleToggleStore}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                  isStoreOpen ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${
                    isStoreOpen ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Order Counter */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <Hash className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Order Counter</h3>
                  <p className="text-2xl font-bold text-purple-400">{orderCounter}</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleResetCounter}
                className="flex items-center gap-2 text-red-400 border-red-400/50 hover:bg-red-400/10 hover:text-red-300"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
};