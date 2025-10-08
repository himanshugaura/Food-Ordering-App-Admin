import React from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - fixed positioning */}
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;