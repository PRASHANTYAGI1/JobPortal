import axios from "axios";
import { useEffect, useState } from "react";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]); 
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const token = localStorage.getItem("token");

  // Fetch all jobs from backend
  const fetchJobs = async () => {
    if (!token) return console.error("No token found. Please login.");
    try {
      const res = await axios.get("http://localhost:5000/api/jobs/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err.response?.data || err.message);
    }
  };

  // Fetch applied jobs from backend
  const fetchAppliedJobs = async () => {
    if (!token) return console.error("No token found. Please login.");
    try {
      const res = await axios.get(
        "http://localhost:5000/api/applications/my-applications",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const appliedIds = res.data.map((app) => app.job);
      setAppliedJobs(appliedIds);
      localStorage.setItem("appliedJobs", JSON.stringify(appliedIds));
    } catch (err) {
      console.error("Error fetching applied jobs:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchAppliedJobs();
  }, []);

  // Open apply modal
  const handleApplyClick = (job) => {
    setCurrentJob(job);
    setShowModal(true);
    setResumeUrl(""); 
    setCoverLetter("");
  };

  // Submit job application
  const handleApplySubmit = async () => {
    if (!token) return alert("You must be logged in to apply.");
    try {
      const payload = {
        jobId: currentJob._id,
        resumeUrl,
        coverLetter,
      };
      const res = await axios.post(
        "http://localhost:5000/api/applications/apply",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const appliedJob = res.data.application.job; // job id from backend
      setAppliedJobs((prev) => [...prev, appliedJob]);
      localStorage.setItem("appliedJobs", JSON.stringify([...appliedJobs, appliedJob]));

      alert("Applied successfully!");
      setShowModal(false);
    } catch (err) {
      console.error("Error applying for job:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  // Filter jobs by search
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Job List</h2>

      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.map((job) => {
          const isApplied = appliedJobs.includes(job._id);
          return (
            <div
              key={job._id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="mb-2">{job.description}</p>
              {isApplied ? (
                <span className="text-green-600 font-bold">Applied</span>
              ) : (
                <button
                  onClick={() => handleApplyClick(job)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Apply
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Apply Modal */}
      {showModal && currentJob && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded w-96 relative">
            <h3 className="text-xl font-semibold mb-4">
              Apply for: {currentJob.title}
            </h3>
            <label className="block mb-2">
              Resume URL:
              <input
                type="text"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                className="border p-2 rounded w-full mt-1"
              />
            </label>
            <label className="block mb-2">
              Cover Letter:
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="border p-2 rounded w-full mt-1"
                rows={4}
              />
            </label>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={handleApplySubmit}
                className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;
