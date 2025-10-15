const express  = require("express");
const router = express.Router();
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware");
const { getAllUsers, deleteUser } = require("../controllers/adminController");

// it get all users like recruter, student
router.get("/users", verifyToken, authorizeRoles("admin"), getAllUsers);
router.delete("/users/:userId", verifyToken, authorizeRoles("admin"), deleteUser);

module.exports = router;