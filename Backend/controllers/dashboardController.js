const User = require("../models/User");
const Job = require("../models/job");
const Application = require("../models/Application");

// 📊 Get admin report (renamed from dashboard)
const getAdminReport = async (req, res) => {
  try {
    const user = req.user;
    const role = user.role.toLowerCase();

    // 🧍 STUDENT REPORT
    if (role === "student") {
      const totalApplications = await Application.countDocuments({ student: user._id });
      const accepted = await Application.countDocuments({ student: user._id, status: "Accepted" });
      const rejected = await Application.countDocuments({ student: user._id, status: "Rejected" });

      return res.json({
        role: "student",
        totalApplications,
        accepted,
        rejected,
      });
    }

    // 🧑‍💼 RECRUITER REPORT
    if (role === "recruter") {
      const jobs = await Job.find({ postedBy: user._id }).lean();
      const totalJobs = jobs.length;

      // Applications per job
      const jobsWithApplications = await Promise.all(
        jobs.map(async (job) => {
          const applications = await Application.find({ job: job._id }).lean();
          return { title: job.title, applications: applications.length };
        })
      );

      const totalApplications = jobsWithApplications.reduce((sum, job) => sum + job.applications, 0);
      const shortlisted = await Application.countDocuments({
        job: { $in: jobs.map((j) => j._id) },
        status: "Shortlisted",
      });

      return res.json({
        role: "recruter",
        totalJobs,
        totalApplications,
        shortlisted,
        jobs: jobsWithApplications,
      });
    }

    // 🧑‍⚖️ ADMIN REPORT
    if (role === "admin") {
      const totalStudents = await User.countDocuments({ role: "student" });
      const totalRecruiters = await User.countDocuments({ role: "recruter" });
      const totalUsers = totalStudents + totalRecruiters;

      const totalJobs = await Job.countDocuments();
      const totalApplications = await Application.countDocuments();

      // Generate application trends by month
      const monthlyData = await Application.aggregate([
        {
          $group: {
            _id: { $month: "$appliedAt" },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id": 1 } },
      ]);

      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];

      const applicationsPerMonth = monthlyData.map((d) => ({
        month: monthNames[d._id - 1],
        count: d.count,
      }));

      // Breakdown by status (pie chart)
      const statusBreakdown = await Application.aggregate([
        {
          $group: {
            _id: "$status",
            value: { $sum: 1 },
          },
        },
      ]);

      const applicationStatusBreakdown = statusBreakdown.map((s) => ({
        status: s._id || "Unknown",
        value: s.value,
      }));

      return res.json({
        role: "admin",
        totalUsers,
        totalStudents,
        totalRecruiters,
        totalJobs,
        totalApplications,
        applicationsPerMonth,
        applicationStatusBreakdown,
      });
    }

    return res.status(400).json({ message: "Invalid user role" });
  } catch (error) {
    console.error("Error fetching admin report:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getAdminReport };
