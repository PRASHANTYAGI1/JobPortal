const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// Middleware 1: Verify Token
exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password -confirmPassword");
    if (!req.user) {
      return res.status(401).json({ error: "User not found." });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

// Middleware 2: Authorize Roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Access denied. You are not authorized to perform this action.",
      });
    }
    next();
  };
};


exports.singleAdminCheck = async (req, res, next) => {
  try {
    if (req.body.role === "admin") {
      const adminExists = await User.findOne({ role: "admin" });
      if (adminExists) {
        return res.status(400).json({
          error: "Admin already exists. Only one admin allowed.",
        });
      }
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
