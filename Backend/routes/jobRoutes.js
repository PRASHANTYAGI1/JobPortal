const express = require("express");
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getRecruiterJobs,
  deleteJob,
} = require("../controllers/jobController");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware");

// Recruiter/Admin creates job
router.post("/jobs/create", verifyToken, authorizeRoles("recruter", "admin"), createJob);

// Any user can view jobs with search/filter
router.get("/", verifyToken, getAllJobs);

// Recruiter/Admin view own jobs
router.get("/jobs/my-jobs", verifyToken, authorizeRoles("recruter", "admin"), getRecruiterJobs);


// Delete a job (Recruiter/Admin)
router.delete(
  "/delete/:jobId",
  verifyToken,
  authorizeRoles("recruter", "admin"),
  deleteJob
);

module.exports = router;
