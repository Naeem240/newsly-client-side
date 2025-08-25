import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
import { use, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

const MainLayout = () => {
  const {theme} = use(AuthContext)
  // Jump to Top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div data-theme={`${theme?'light':'dark'}`}>
      <Navbar />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
