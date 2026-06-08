// Authentication Routes
const express = require("express");
const router = express.Router();
const {
  signup,
  studentLogin,
  adminLogin,
} = require("../controllers/authController");

// Signup
router.post("/signup", signup);

// Student Login
router.post("/student-login", studentLogin);

// Admin Login
router.post("/admin-login", adminLogin);

module.exports = router;
