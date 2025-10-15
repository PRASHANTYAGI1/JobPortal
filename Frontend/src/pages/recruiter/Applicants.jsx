import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const statusColors = {
  Pending: "bg-yellow-200 text-yellow-800",
  Shortlisted: "bg-blue-600 text-white",
  Accepted: "bg-green-600 text-white",
  Rejected: "bg-red-600 text-white",
};

const Applicants = () => {
  const [recruiterJobs, setRecruiterJobs] = useState([]);
  const [applications, setApplications] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch recruiter's jobs
  useEffect(() => {
    const fetchRecruiterJobs = async () => {
      try {
        const { data } = await axios.get("jobs/jobs/my-jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecruiterJobs(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecruiterJobs();
  }, [token]);

  // Fetch applications for each job
  useEffect(() => {
    const fetchApplications = async () => {
      if (!recruiterJobs.length) return;
      const allApplications = {};

      for (let job of recruiterJobs) {
        try {
          const { data } = await axios.get(`/applications/job/${job._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          allApplications[job._id] = data; // applications per job
        } catch (err) {
          console.error(err);
        }
      }

      setApplications(allApplications);
      setLoading(false);
    };

    fetchApplications();
  }, [recruiterJobs, token]);

  // Handle application status update
  const handleStatusChange = async (appId, status, jobId) => {
    try {
      await axios.patch(
        `/applications/update-status/${appId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update frontend state instantly
      setApplications((prev) => {
        const updated = { ...prev };
        updated[jobId] = updated[jobId].map((app) =>
          app._id === appId ? { ...app, status } : app
        );
        return updated;
      });
    } catch (err) {
      console.error("Failed to update status:", err.response?.data?.error || err.message);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!recruiterJobs.length) return <p className="text-center py-10">No jobs posted yet.</p>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-12">
      <h2 className="text-3xl font-bold text-center mb-8">Applicants</h2>

      {recruiterJobs.map((job) => (
        <div key={job._id} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">
            {job.title} - <span className="text-gray-500">{job.company}</span>
          </h3>

          {applications[job._id]?.length ? (
            <div className="space-y-4">
              {applications[job._id].map((app) => (
                <div
                  key={app._id}
                  className="border p-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center gap-4 hover:shadow-lg transition"
                >
                  {/* Left block: Student info */}
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-lg">{app.studentName}</p>
                    <p className="text-gray-600">{app.email}</p>
                    <p className="text-gray-500">
                      Resume:{" "}
                      {app.resumeUrl ? (
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </a>
                      ) : (
                        "Not uploaded"
                      )}
                    </p>
                    <p className="text-gray-500">
                      Cover Letter: {app.coverLetter || "Not provided"}
                    </p>
                  </div>

                  {/* Right block: Status buttons */}
                  <div className="flex gap-2 mt-4 md:mt-0">
                    {["Shortlisted", "Accepted", "Rejected"].map((statusOption) => (
                      <button
                        key={statusOption}
                        onClick={() => handleStatusChange(app._id, statusOption, job._id)}
                        className={`px-3 py-1 rounded-md font-medium transition ${
                          app.status === statusOption
                            ? statusColors[statusOption]
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {statusOption}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No applicants yet for this job.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Applicants;
