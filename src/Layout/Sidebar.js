import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaThLarge, FaSignOutAlt, FaPoll } from "react-icons/fa";
import Logo from "../assets/logo512.png";
import "./Sidebar.css";

export default function Sidebar() {
  const { pathname } = useLocation();

  const [openMenus, setOpenMenus] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleMenu = (category) => {
    setOpenMenus((prev) => ({ ...prev, [category]: !prev[category] }));
  };



  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const linkClass = (active) =>
    `sidebar-link ${active ? "active-link" : ""}`;

  return (
    <>
      {isMobile && (
        <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </button>
      )}

      <div className={`sidebar-container ${sidebarOpen ? "show" : ""}`}>
        <div className="sidebar-header">
          <img src={Logo} width="38" alt="Logo" />
          <div>
            <div className="title-main">Tantangan</div>
            <div className="title-sub">Interview</div>
          </div>
        </div>

        <div className="sidebar-menu">
          <Link to="/" className={linkClass(pathname === "/")}>
            <FaThLarge /> Menu 1
          </Link>

          {/* MENU DROPDOWN */}
          <div>
            <div className="sidebar-category" onClick={() => toggleMenu("menu1")}>
              <span className="category-label">
                <FaPoll /> Menu 2
              </span>
              <span>{openMenus.menu1 ? "▾" : "▸"}</span>
            </div>

            {openMenus.menu1 && (
              <div className="sidebar-submenu">
                <Link
                  to="/menu2"
                  className={linkClass(pathname === "/menu2")}
                >
                  Menu 2 -1
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="sidebar-logout">
          <button onClick={() => alert("Logout dipanggil")}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </>
  );
}
