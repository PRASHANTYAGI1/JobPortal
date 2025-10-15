const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter job title"],
  },
  description: {
    type: String,
    required: [true, "Please enter job description"],
  },
  company: {
    type: String,
    required: [true, "Please enter company name"],
  },
  location: {
    type: String,
    required: [true, "Please enter job location"],
  },
  salary: {
    type: String,
    required: [true, "Please enter salary details"],
  },
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Internship", "Remote"],
    default: "Full-time",
  },
  requirements: [String],

  // Recruiter who posted this job
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

jobSchema.index({ title: 1, postedBy: 1 }, { unique: true });

module.exports = mongoose.model("Job", jobSchema);
