import React, { useState } from "react";
import axios from "axios";

const JobCard = ({ job, token, application }) => {
  const [applied, setApplied] = useState(!!application);
  const [status, setStatus] = useState(application?.status || "Not Applied");
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!token) {
      alert("Please log in to apply for jobs.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `/api/applications/apply/${job._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplied(true);
      setStatus("Applied");
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Failed to apply. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-sm text-gray-500 mb-3">{job.location}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills?.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      {applied ? (
        <button
          disabled
          className="px-4 py-2 bg-green-100 text-green-700 rounded-lg cursor-default"
        >
          ✅ {status}
        </button>
      ) : (
        <button
          onClick={handleApply}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {loading ? "Applying..." : "Apply Now"}
        </button>
      )}
    </div>
  );
};

export default JobCard;
