const Job = require("../models/job");
const User = require("../models/User");

// ✅ Create a new Job (Recruiter Only)
exports.createJob = async (req, res) => {
  try {
    const { title, description, company, location, salary, jobType, requirements } = req.body;

    const job = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      jobType,
      requirements,
      postedBy: req.user._id, // recruiter’s ID from middleware
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all jobs (Students can view)
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "username email");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get jobs posted by a specific recruiter
exports.getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getAllJobs = async (req, res) => {
  try {
    const { keyword, location, jobType, minSalary, maxSalary } = req.query;

    // Build dynamic filter
    let filter = {};

    if (keyword) {
      filter.$text = { $search: keyword }; // search in title & description
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" }; // case-insensitive
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    if (minSalary || maxSalary) {
      filter.salary = {};
      if (minSalary) filter.salary.$gte = Number(minSalary);
      if (maxSalary) filter.salary.$lte = Number(maxSalary);
    }

    const jobs = await Job.find(filter)
      .populate("postedBy", "username email")
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





// Delete a job (Recruiter/Admin)
exports.deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Find job
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });

    // Only the recruiter who posted or admin can delete
    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized to delete this job" });
    }

    await job.deleteOne(); // delete the job
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
