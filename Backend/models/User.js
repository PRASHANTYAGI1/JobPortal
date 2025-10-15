const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  password: { type: String, required: [true, "Please provide a password"] },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
  },
  role: {
    type: String,
    enum: ["student", "recruter", "admin"],
    default: "user",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
