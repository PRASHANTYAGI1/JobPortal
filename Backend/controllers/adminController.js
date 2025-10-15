const User = require("../models/User");
const Job = require("../models/job");
const Application = require("../models/Application");

// ✅ Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -confirmPassword");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Server error while fetching users." });
  }
};

// ✅ Delete user and all related data
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Step 1: Find user first
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Step 2: If recruiter → delete all jobs & their applications
    if (user.role === "recruter") {
      const jobs = await Job.find({ postedBy: user._id });
      const jobIds = jobs.map((job) => job._id);

      // Delete all applications associated with recruiter's jobs
      await Application.deleteMany({ job: { $in: jobIds } });

      // Delete the recruiter's jobs
      await Job.deleteMany({ postedBy: user._id });

      console.log(
        `Deleted ${jobs.length} jobs and related applications for recruiter: ${user.email}`
      );
    }

    // Step 3: If student → delete all their job applications
    if (user.role === "student") {
      const deletedApplications = await Application.deleteMany({
        student: user._id,
      });

      console.log(
        `Deleted ${deletedApplications.deletedCount} applications for student: ${user.email}`
      );
    }

    // Step 4: Finally delete the user itself
    await User.findByIdAndDelete(userId);

    console.log(`User (${user.role}) deleted: ${user.email}`);

    return res.status(200).json({
      success: true,
      message: `User (${user.role}) and all related data deleted successfully.`,
    });
  } catch (err) {
    console.error("❌ Error deleting user and related data:", err);
    return res
      .status(500)
      .json({ error: "Server error while deleting user and related data." });
  }
};
