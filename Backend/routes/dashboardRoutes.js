const express = require("express");
const router = express.Router();
const { getAdminReport } = require("../controllers/dashboardController");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware");

// All roles access their own dashboard stats
router.get("/dashboard/stats", verifyToken, authorizeRoles("student", "recruter", "admin"), getAdminReport);

module.exports = router;
