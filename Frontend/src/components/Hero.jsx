import React from "react";
import { Link } from "react-router-dom";

const Hero = ({ user }) => {
  const role = user?.role?.toLowerCase();

  return (
    <section className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 py-20 px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Welcome to Job Portal
      </h1>
      <p className="text-lg md:text-2xl mb-6 max-w-2xl mx-auto">
        Find your dream job, post job opportunities, and manage your team effectively.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </>
        ) : role === "student" ? (
          <Link
            to="/jobs"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Explore Jobs
          </Link>
        ) : role === "recruter" ? (
          <Link
            to="/post-job"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Post a Job
          </Link>
        ) : role === "admin" ? (
          <Link
            to="/admin/dashboard"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Go to Dashboard
          </Link>
        ) : null}
      </div>
    </section>
  );
};

export default Hero;
