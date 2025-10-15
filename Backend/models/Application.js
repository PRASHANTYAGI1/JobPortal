const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  resumeUrl: {
    type: String, // link to uploaded resume or file path
  },
  coverLetter: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Applied", "Shortlisted", "Rejected", "Accepted"],
    default: "Applied",
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure a student cannot apply to the same job twice
applicationSchema.index({ job: 1, student: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
