import React, { useState } from "react";
import axios from "axios";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [requirements, setRequirements] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !description || !company || !location || !salary || !jobType) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/jobs/jobs/create",
        { title, description, company, location, salary, jobType, requirements },
        config
      );

      setSuccess(data.message);

      // Reset form
      setTitle(""); setDescription(""); setCompany("");
      setLocation(""); setSalary(""); setJobType(""); setRequirements("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to post job");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-700">
        Post a Job
      </h2>

      {error && <p className="text-red-600 text-center mb-4 font-medium">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4 font-medium">{success}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Left Block: Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Job Title*</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., Frontend Developer"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Company*</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., Tech Solutions Inc."
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Location*</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., Remote / New York"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Salary*</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., 60000"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Job Type*</label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>

        {/* Right Block: Description & Requirements */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Job Description*</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="8"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write about responsibilities, tasks, and expectations..."
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Requirements</label>
            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              rows="6"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Skills, experience, or education requirements..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
