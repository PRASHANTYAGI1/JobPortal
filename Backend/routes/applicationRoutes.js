const express = require("express");
const router = express.Router();
const { applyToJob, getApplicationsForJob, updateApplicationStatus, getApplicationsForStudent } = require("../controllers/applicationController");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware");

//Student applies to a job
router.post("/apply", verifyToken, authorizeRoles("student"), applyToJob);

// Recruiter views applications for a specific job
router.get("/job/:jobId", verifyToken, authorizeRoles("recruter"), getApplicationsForJob);

// routes/applicationRoutes.js
// Student can check their applications
router.get("/my-applications", verifyToken, authorizeRoles("student"), getApplicationsForStudent);


// Recruiter updates application status
router.patch("/update-status/:applicationId", verifyToken, authorizeRoles("recruter"), updateApplicationStatus);


module.exports = router;
