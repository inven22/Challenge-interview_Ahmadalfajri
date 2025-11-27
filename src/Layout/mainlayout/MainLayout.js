import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";

import "./MainLayout.css"; // ← CSS dipisahkan

const MainLayout = ({ role, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-white border-r shadow-md 
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        <Sidebar />
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="main-content">
        <Header
          role={role}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="content">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
