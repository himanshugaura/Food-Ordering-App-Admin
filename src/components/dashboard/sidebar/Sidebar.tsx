"use client";
import React from "react";
import { LogOut, Loader, Menu, Scroll, Text, ScrollText } from "lucide-react";
import { BarChart3, Clock, Home, MessageSquare, Package, Settings } from "lucide-react";
import { useAppDispatch } from "@/lib/store/store";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/auth";
import Button from "@/components/common/Button";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  logoutLoading: boolean;
}

const AppSidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab}) => {
  const menuItems = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'orders', label: 'ORDER HISTORY', icon: Clock },
    { id: 'menu', label: 'MENU', icon: ScrollText },
    { id: 'statistics', label: 'STATISTICS', icon: BarChart3 },
    { id: 'products', label: 'PRODUCTS', icon: Package },
    { id: 'settings', label: 'SETTINGS', icon: Settings },
  ];

  const [logoutLoading, setLogoutLoading] = React.useState(false);
  const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = async () => {
      setLogoutLoading(true);
      const result = await dispatch(logout());
      if(result)
      {
        router.replace("/login");
      }
  
      setLogoutLoading(false);
    };
  

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 relative">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold">
          <span className="text-orange-500">f</span>
          <span className="text-black">oo</span>
          <span className="text-orange-500">d</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                isActive
                  ? 'bg-orange-50 text-orange-600 border border-orange-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span className={isActive ? 'font-medium' : ''}>{item.label}</span>
            </div>
          );
        })}
      </nav>

      {/* Logout */}
     <div className="w-fit absolute bottom-6 left-6 right-4">
  <Button
    variant="secondary"
    size="sm"
    disabled={logoutLoading}
    onClick={handleLogout}
  >
    
    {logoutLoading ? (<Loader className="animate-spin"/>) : <LogOut size={20} />}
    <span>Log Out</span>
  </Button>
</div>

    </div>
  );
};

export default AppSidebar;
