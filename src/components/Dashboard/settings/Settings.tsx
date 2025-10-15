import { useState } from "react";
import { Store, UserCog, Sliders } from "lucide-react";
import AdminSettings from "./AdminSettings"
import { StoreSettings } from "./StoreSettings"

const Settings = () => {
  const [activeTab, setActiveTab] = useState("store");

  return (
    <div className="w-full min-h-screen">
      {/* Header Section */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-500/20 p-3 rounded-xl">
              <Sliders className="w-7 h-7 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Manage your store and admin configurations
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === "store"
                  ? "bg-amber-600 text-white shadow-lg shadow-amber-500/50"
                  : "bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-200"
              }`}
              onClick={() => setActiveTab("store")}
            >
              <Store className="w-5 h-5" />
              <span>Store Settings</span>
          
            </button>

            <button
              className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === "admin"
                  ? "bg-amber-600 text-white shadow-lg shadow-amber-500/50"
                  : "bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-200"
              }`}
              onClick={() => setActiveTab("admin")}
            >
              <UserCog className="w-5 h-5" />
              <span>Admin Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-in fade-in slide-in-from-bottom duration-500">
          {activeTab === "store" ? <StoreSettings /> : <AdminSettings />}
        </div>
      </div>
    </div>
  );
};

export default Settings;