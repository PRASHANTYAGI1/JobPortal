import axios from "axios";
import { useEffect, useState } from "react";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all applications by the logged-in student
  const fetchAppliedJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("No token found in localStorage");
        setLoading(false);
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/api/applications/my-applications",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAppliedJobs(res.data.applications || res.data);
    } catch (err) {
      console.error("Error fetching applied jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Auto refresh every 10 seconds to reflect recruiter updates
  useEffect(() => {
    fetchAppliedJobs();
    const interval = setInterval(fetchAppliedJobs, 10000); // 10s refresh
    return () => clearInterval(interval);
  }, []);

  // Color for each status type
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "shortlisted":
        return "text-blue-600";
      case "accepted":
        return "text-green-600";
      case "rejected":
        return "text-red-600";
      case "pending":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        My Applied Jobs
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading applications...</p>
      ) : appliedJobs.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          You haven’t applied to any jobs yet.
        </p>
      ) : (
        <ul className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {appliedJobs.map((app, index) => {
            const job = app.job || {};
            return (
              <li
                key={app._id || index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {job.title || "Untitled Job"}
                  </h3>

                  {job.company && (
                    <p className="text-sm text-indigo-600 font-medium mb-2">
                      Company: {job.company}
                    </p>
                  )}

                  {job.description && (
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {job.description}
                    </p>
                  )}

                  {app.resumeUrl && (
                    <p className="text-sm mb-2">
                      <span className="font-semibold">Resume:</span>{" "}
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        View
                      </a>
                    </p>
                  )}

                  {app.coverLetter && (
                    <p className="text-sm mb-2">
                      <span className="font-semibold">Cover Letter:</span>{" "}
                      <span>{app.coverLetter}</span>
                    </p>
                  )}
                </div>

                <p
                  className={`mt-4 text-right font-semibold ${getStatusColor(
                    app.status
                  )}`}
                >
                  Status: {app.status || "Pending"}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AppliedJobs;
