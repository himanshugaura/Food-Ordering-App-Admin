"use client";
import Home from "@/components/dashboard/home/Home";
import CategoryUploadPage from "@/components/dashboard/menu/category";
import ProductsPage from "@/components/dashboard/menu/menu";
import ProductUploadPage from "@/components/dashboard/menu/uploadProduct";
import AppSidebar from "@/components/dashboard/sidebar/Sidebar";
import { getAdminData } from "@/lib/api/auth";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");
  const [logoutLoading, setLogoutLoading] = useState(false);

  const admin = useAppSelector((state) => state.auth.admin);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [authLoading, setAuthLoading] = useState(true);
    
  
    useEffect(() => {
      const verifyAdmin = async () => {
        if (admin) {
          setAuthLoading(false);
          return;
        }
  
        const result = await dispatch(getAdminData());
  
        if (!result) {
          router.replace("/login");
        } else {
          setAuthLoading(false);
        }
      };
  
      verifyAdmin();
    }, [admin, dispatch, router]);
  
    if (authLoading) {
      return (
        <div className="flex items-center justify-center h-screen w-screen">
        <div className="loader"></div>
        </div>
      );
    }
  

  const handleLogout = async () => {
    setLogoutLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // mock logout
    setLogoutLoading(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
  {/* Sidebar (fixed height, no scroll) */}
  
    <AppSidebar
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={handleLogout}
      logoutLoading={logoutLoading}
    />


  {/* Main Content  */}
  <main className="flex-1 p-6 overflow-y-auto">
    {activeTab === "home" && <Home />}
    {activeTab === "orders" && <div>📦 Orders Content</div>}
    {activeTab === "menu" && <div><ProductsPage/></div>}
    {activeTab === "statistics" && <div>📊 Sta          tistics Content</div>}
    {activeTab === "products" && <ProductsPage />}
    {activeTab === "settings" && <div>⚙️ Settings Content</div>}
  </main>
</div>

  );
}
