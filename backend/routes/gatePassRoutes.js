// Gate Pass Routes
const express = require("express");
const router = express.Router();
const {
  createGatePass,
  getStudentGatePasses,
  getAllGatePasses,
  getGatePassById,
  editGatePass,
  deleteGatePass,
  approveGatePass,
  rejectGatePass,
  getDashboardStats,
  getStudentStats,
} = require("../controllers/gatePassController");
const {
  authMiddleware,
  adminMiddleware,
  studentMiddleware,
} = require("../middleware/auth");

// Create gate pass (Student)
router.post("/", authMiddleware, studentMiddleware, createGatePass);

// Get all gate passes for a student
router.get(
  "/my-passes",
  authMiddleware,
  studentMiddleware,
  getStudentGatePasses,
);

// Get student statistics
router.get(
  "/stats/student",
  authMiddleware,
  studentMiddleware,
  getStudentStats,
);

// Edit gate pass
router.put("/:id", authMiddleware, studentMiddleware, editGatePass);

// Delete gate pass
router.delete("/:id", authMiddleware, studentMiddleware, deleteGatePass);

// Get all gate passes (Admin)
router.get("/", authMiddleware, adminMiddleware, getAllGatePasses);

// Get gate pass by ID
router.get("/:id", authMiddleware, getGatePassById);

// Approve gate pass (Admin)
router.put("/:id/approve", authMiddleware, adminMiddleware, approveGatePass);

// Reject gate pass (Admin)
router.put("/:id/reject", authMiddleware, adminMiddleware, rejectGatePass);

// Get dashboard statistics (Admin)
router.get("/admin/stats", authMiddleware, adminMiddleware, getDashboardStats);

module.exports = router;
