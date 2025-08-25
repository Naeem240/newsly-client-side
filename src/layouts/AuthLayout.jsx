import { use } from "react";
import { Outlet } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const AuthLayout = () => {
  const {theme} = use(AuthContext)
  return (
    <div data-theme={`${theme?'light':'dark'}`} className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded shadow">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
