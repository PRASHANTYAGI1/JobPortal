const Application = require("../models/Application");
const Job = require("../models/job");

// Student applies to a job
exports.applyToJob = async (req, res) => {
  try {
    const { jobId, resumeUrl, coverLetter } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Create application
    const application = await Application.create({
      job: jobId,
      student: req.user._id,
      resumeUrl,
      coverLetter,

    });

    res.status(201).json({ message: "Application submitted successfully", application,jobtitle:job.title,jobcompany:job.company,studentname:req.user.username });
  } catch (error) {
    // Handle unique index violation (already applied)
    if (error.code === 11000) {
      return res.status(400).json({ error: "You have already applied to this job" });
    }
    res.status(500).json({ error: error.message });
  }
};

// Recruiter views applications for their job
exports.getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Make sure the recruiter owns this job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You are not authorized to view applications for this job" });
    }

    const applications = await Application.find({ job: jobId }).populate("student", "username email");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Recruiter updates application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body; // "Shortlisted", "Accepted", "Rejected"

    // Find application
    const application = await Application.findById(applicationId).populate("job");

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Ensure the logged-in recruiter owns this job
    if (application.job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You are not authorized to update this application" });
    }

    // Update status
    application.status = status;
    await application.save();

    res.status(200).json({
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getApplicationsForStudent = async (req, res) => {
  try {
    const studentId = req.user._id;
    const applications = await Application.find({ student: studentId }).lean();
    return res.json(applications);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};




// here i get application id to see updated status of job 

// http://localhost:5000/api/applications/apply
// {
//   "jobId": "68ec054ed5d233aeb3633f78",
//   "resumeUrl": "https://example.com/resume.pdf",
//   "coverLetter": "I am very interested in this job because..."
// }


// {
//     "message": "Application submitted successfully",
//     "application": {
//         "job": "68ec054ed5d233aeb3633f78",
//         "student": "68ec075ec500356919588e97",
//         "resumeUrl": "https://example.com/resume.pdf",
//         "coverLetter": "I am very interested in this job because...",
//         "status": "Applied",
//         "_id": "68ec0810c500356919588e9e",
//         "appliedAt": "2025-10-12T19:57:04.894Z",
//         "__v": 0
//     }
// }
