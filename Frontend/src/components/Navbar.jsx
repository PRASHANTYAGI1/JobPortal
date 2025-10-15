import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn, userRole, setUserRole }) => {
  const navigate = useNavigate();

  const getNavItems = () => {
    if (!isLoggedIn) {
      return [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
      ];
    }

    switch (userRole.toLowerCase()) {
      case "student":
        return [
          { name: "Jobs", path: "/jobs" },
          { name: "My Applications", path: "/applications" },
        ];
      case "recruter":
        return [
          { name: "Post a Job", path: "/post-job" },
          { name: "My Listings", path: "/my-jobs" },
          { name: "Applicants", path: "/applicants" },
        ];
      case "admin":
        return [
          { name: "Dashboard", path: "/dashboard" },
          { name: "Manage Users", path: "/users" },
          { name: "Reports", path: "/admin/reports" },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="w-full flex justify-between items-center bg-white shadow-md px-6 py-3 sticky top-0 z-50">
      {/* Logo navigates to Home */}
      <div
        className="flex items-center gap-2 font-bold text-blue-600 text-xl cursor-pointer select-none hover:text-blue-700 transition duration-300 ease-in-out"
        onClick={() => navigate("/")}
      >
        <span className="text-2xl">💼</span>
        Job Portal
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 ease-in-out font-medium cursor-pointer select-none"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Login / Profile */}
      <div className="flex items-center gap-4">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 ease-in-out cursor-pointer select-none"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer select-none"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-3">
            {/* Profile icon links to dashboard */}
            <Link
              to="/dashboard"
              className="border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer select-none"
              title="Dashboard"
            >
              👤
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setIsLoggedIn(false);
                setUserRole("");
                navigate("/");
              }}
              className="text-red-600 hover:text-red-700 font-medium transition-colors duration-300 ease-in-out cursor-pointer select-none"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
