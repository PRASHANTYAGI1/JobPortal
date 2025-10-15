import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios"; // make sure axios is configured
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role?.toLowerCase();
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard stats based on role
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  if (loading) return <p className="text-center py-10">Loading dashboard...</p>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-12">
      <h2 className="text-3xl font-bold text-center mb-8">Dashboard</h2>

      {/* User Info */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">User Info</h3>
        <p>Name: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Role: {role}</p>
        {role === "student" && <p>Resume: {user.resume ? <a href={user.resume} target="_blank" className="text-blue-600 hover:underline">View</a> : "Not uploaded"}</p>}
      </div>

      {/* STUDENT DASHBOARD */}
      {role === "student" && (
        <div className="space-y-8">
          <h3 className="text-2xl font-semibold">Student Summary</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500">Applications Submitted</p>
              <p className="text-3xl font-bold">{stats.totalApplications || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500">Accepted</p>
              <p className="text-3xl font-bold">{stats.accepted || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500">Rejected</p>
              <p className="text-3xl font-bold">{stats.rejected || 0}</p>
            </div>
          </div>

          {/* Graph */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-4">Application Status Overview</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Accepted", value: stats.accepted || 0 },
                    { name: "Rejected", value: stats.rejected || 0 },
                    { name: "Pending", value: (stats.totalApplications || 0) - ((stats.accepted || 0) + (stats.rejected || 0)) },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  <Cell fill="#4ade80" />
                  <Cell fill="#f87171" />
                  <Cell fill="#facc15" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* RECRUITER DASHBOARD */}
      {role === "recruter" && (
        <div className="space-y-8">
          <h3 className="text-2xl font-semibold">Recruiter Summary</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500">Jobs Posted</p>
              <p className="text-3xl font-bold">{stats.totalJobs || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500">Applications Received</p>
              <p className="text-3xl font-bold">{stats.totalApplications || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500">Shortlisted</p>
              <p className="text-3xl font-bold">{stats.shortlisted || 0}</p>
            </div>
          </div>

          {/* Graph */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-4">Applications Per Job</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.jobs || []} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ADMIN DASHBOARD */}
      {role === "admin" && (
        <div className="space-y-8">
          <h3 className="text-2xl font-semibold">Admin Summary</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500">Total Students</p>
              <p className="text-3xl font-bold">{stats.totalStudents || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500">Total Recruiters</p>
              <p className="text-3xl font-bold">{stats.totalRecruiters || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500">Total Jobs</p>
              <p className="text-3xl font-bold">{stats.totalJobs || 0}</p>
            </div>
          </div>

          {/* Optional: admin controls */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h4 className="text-lg font-semibold">Admin Controls</h4>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/admin/users"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Manage Users
              </Link>
              <Link
                to="/admin/jobs"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Manage Jobs
              </Link>
              <Link
                to="/admin/applications"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
              >
                Manage Applications
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
