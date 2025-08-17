import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
import { useEffect } from "react";

const MainLayout = () => {
  // Jump to Top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
