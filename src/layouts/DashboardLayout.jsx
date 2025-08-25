import { Link, Outlet } from "react-router";
import NewsHubLogo from "../components/NewsHubLogo";
import { use, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { AuthContext } from "../contexts/AuthContext";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {theme} = use(AuthContext)

  return (
    <div data-theme={`${theme?'light':'dark'}`} className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile Top Navbar */}
      <div className="flex items-center justify-between bg-gray-800 text-gray-100 p-4 md:hidden">
        <NewsHubLogo />
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-2xl"
        >
          <IoMenu />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-screen w-64 bg-gray-800 text-gray-100 p-6 space-y-4 transform transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >        
        {/* Close button for mobile */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <NewsHubLogo />
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-xl"
          >
            ✕
          </button>
        </div>

        {/* Logo for desktop */}
        <div className="hidden md:block">
          <NewsHubLogo />
        </div>

        <h2 className="text-xl font-bold mb-6 hidden md:block">
          Admin Dashboard
        </h2>

        <nav className="space-y-2">
          <Link to="/admin" className="block hover:text-primary">Overview</Link>
          <Link to="/admin/all-users" className="block hover:text-primary">All Users</Link>
          <Link to="/admin/all-articles" className="block hover:text-primary">All Articles</Link>
          <Link to="/admin/add-publisher" className="block hover:text-primary">Add Publisher</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
