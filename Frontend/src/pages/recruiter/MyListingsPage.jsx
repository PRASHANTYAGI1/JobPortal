import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const MyListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch recruiter jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get("jobs/jobs/my-jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [token]);

  // Delete a job
  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axios.delete(`jobs/delete/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove job from UI
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error("Failed to delete job:", err.response?.data?.error || err.message);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!jobs.length) return <p className="text-center py-10">No jobs posted yet.</p>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
        My Job Listings
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white/30 backdrop-blur-md border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 relative"
          >
            {/* Job Title */}
            <h3 className="text-2xl font-bold text-blue-600 mb-2">{job.title}</h3>

            {/* Company & Location */}
            <p className="text-gray-700 mb-2 font-medium">
              <span className="text-green-600 font-semibold">{job.company}</span> •{" "}
              <span className="text-purple-600">{job.location}</span>
            </p>

            {/* Description */}
            <p className="text-gray-600 mb-3 line-clamp-3">{job.description}</p>

            {/* Job Details */}
            <div className="flex flex-wrap gap-3 mb-3">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                {job.jobType}
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                Salary: {job.salary || "Not specified"}
              </span>
            </div>

            {/* Requirements */}
            {job.requirements && (
              <div className="text-gray-700 text-sm mb-3">
                <span className="font-semibold">Requirements: </span>
                {job.requirements}
              </div>
            )}

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(job._id)}
              className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
