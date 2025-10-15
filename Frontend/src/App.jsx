import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Applicants from "./pages/recruiter/Applicants";
import MyListings from "./pages/recruiter/MyListingsPage";
import PostJob from "./pages/recruiter/PostJob";
import Dashboard from "./pages/Dashboard";

import ManageUsers from "./pages/admin/ManageUsers";
import Report from "./pages/admin/Report";

import JobList from "./pages/Student/JobList";
import AppliedJobs from "./pages/Student/MyApplications"; // new import

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role) {
      setIsLoggedIn(true);
      setUserRole(user.role.toLowerCase());
    }
  }, []);

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!isLoggedIn) return <Navigate to="/login" replace />;
    if (!allowedRoles.includes(userRole)) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userRole={userRole}
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} userRole={userRole} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={["student", "recruter", "admin"]}>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/users" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageUsers />
          </ProtectedRoute>
        } />
        <Route path="/admin/reports" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Report />
          </ProtectedRoute>
        } />

        {/* Recruiter/Admin Routes */}
        <Route path="/post-job" element={
          <ProtectedRoute allowedRoles={["recruter", "admin"]}>
            <PostJob />
          </ProtectedRoute>
        } />
        <Route path="/my-jobs" element={
          <ProtectedRoute allowedRoles={["recruter", "admin"]}>
            <MyListings />
          </ProtectedRoute>
        } />
        <Route path="/applicants" element={
          <ProtectedRoute allowedRoles={["recruter", "admin"]}>
            <Applicants />
          </ProtectedRoute>
        } />

        {/* Student Routes */}
        <Route path="/jobs" element={
          <ProtectedRoute allowedRoles={["student"]}>
            <JobList />
          </ProtectedRoute>
        } />
        <Route path="/applications" element={
          <ProtectedRoute allowedRoles={["student"]}>
            <AppliedJobs />
          </ProtectedRoute>
        } />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
