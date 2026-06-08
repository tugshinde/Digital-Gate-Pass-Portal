// Gate Pass Controller
const GatePass = require("../models/GatePass");
const User = require("../models/User");
const { generateQRCode } = require("../config/qrService");
const {
  sendApprovalEmail,
  sendRejectionEmail,
} = require("../config/emailService");

// Create gate pass
const createGatePass = async (req, res) => {
  try {
    const {
      fullName,
      department,
      rollNumber,
      purpose,
      outDate,
      outTime,
      returnDate,
      returnTime,
    } = req.body;
    const userId = req.user.userId;

    // Validation
    if (
      !fullName ||
      !department ||
      !rollNumber ||
      !purpose ||
      !outDate ||
      !outTime ||
      !returnDate ||
      !returnTime
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find user to get email
    const user = await User.findById(userId);

    // Create new gate pass
    const newGatePass = new GatePass({
      studentId: userId,
      fullName,
      email: user.email,
      department,
      rollNumber,
      purpose,
      outDate,
      outTime,
      returnDate,
      returnTime,
      status: "Pending",
    });

    await newGatePass.save();

    res.status(201).json({
      success: true,
      message: "Gate pass request submitted successfully",
      data: newGatePass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all gate passes for a student
const getStudentGatePasses = async (req, res) => {
  try {
    const userId = req.user.userId;

    const gatePasses = await GatePass.find({ studentId: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: gatePasses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all gate passes (for admin)
const getAllGatePasses = async (req, res) => {
  try {
    const gatePasses = await GatePass.find()
      .sort({ createdAt: -1 })
      .populate("studentId", "firstName lastName");

    res.status(200).json({
      success: true,
      data: gatePasses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get gate pass by ID
const getGatePassById = async (req, res) => {
  try {
    const { id } = req.params;

    const gatePass = await GatePass.findById(id).populate(
      "studentId",
      "firstName lastName email",
    );

    if (!gatePass) {
      return res.status(404).json({
        success: false,
        message: "Gate pass not found",
      });
    }

    res.status(200).json({
      success: true,
      data: gatePass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Edit gate pass
const editGatePass = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      department,
      rollNumber,
      purpose,
      outDate,
      outTime,
      returnDate,
      returnTime,
    } = req.body;
    const userId = req.user.userId;

    // Find gate pass
    const gatePass = await GatePass.findById(id);

    if (!gatePass) {
      return res.status(404).json({
        success: false,
        message: "Gate pass not found",
      });
    }

    // Check if user is the owner
    if (gatePass.studentId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own gate pass",
      });
    }

    // Can only edit if status is Pending
    if (gatePass.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Can only edit gate passes with Pending status",
      });
    }

    // Update gate pass
    gatePass.fullName = fullName || gatePass.fullName;
    gatePass.department = department || gatePass.department;
    gatePass.rollNumber = rollNumber || gatePass.rollNumber;
    gatePass.purpose = purpose || gatePass.purpose;
    gatePass.outDate = outDate || gatePass.outDate;
    gatePass.outTime = outTime || gatePass.outTime;
    gatePass.returnDate = returnDate || gatePass.returnDate;
    gatePass.returnTime = returnTime || gatePass.returnTime;

    await gatePass.save();

    res.status(200).json({
      success: true,
      message: "Gate pass updated successfully",
      data: gatePass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete gate pass
const deleteGatePass = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Find gate pass
    const gatePass = await GatePass.findById(id);

    if (!gatePass) {
      return res.status(404).json({
        success: false,
        message: "Gate pass not found",
      });
    }

    // Check if user is the owner
    if (gatePass.studentId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own gate pass",
      });
    }

    // Can only delete if status is Pending
    if (gatePass.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Can only delete gate passes with Pending status",
      });
    }

    await GatePass.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Gate pass deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Approve gate pass
const approveGatePass = async (req, res) => {
  try {
    const { id } = req.params;

    // Find gate pass
    const gatePass = await GatePass.findById(id);

    if (!gatePass) {
      return res.status(404).json({
        success: false,
        message: "Gate pass not found",
      });
    }

    // Generate QR code
    const qrCode = await generateQRCode(gatePass);

    // Update gate pass
    gatePass.status = "Approved";
    gatePass.qrCode = qrCode;

    await gatePass.save();

    // Send approval email
    const passDetails = {
      passId: gatePass._id,
      fullName: gatePass.fullName,
      department: gatePass.department,
      rollNumber: gatePass.rollNumber,
      purpose: gatePass.purpose,
      outDate: gatePass.outDate.toLocaleDateString(),
      outTime: gatePass.outTime,
      returnDate: gatePass.returnDate.toLocaleDateString(),
      returnTime: gatePass.returnTime,
    };

    await sendApprovalEmail(
      gatePass.email,
      gatePass.fullName,
      passDetails,
      qrCode,
    );

    res.status(200).json({
      success: true,
      message: "Gate pass approved successfully",
      data: gatePass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reject gate pass
const rejectGatePass = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        message: "Rejection reason is required",
      });
    }

    // Find gate pass
    const gatePass = await GatePass.findById(id);

    if (!gatePass) {
      return res.status(404).json({
        success: false,
        message: "Gate pass not found",
      });
    }

    // Update gate pass
    gatePass.status = "Rejected";
    gatePass.rejectionReason = reason;

    await gatePass.save();

    // Send rejection email
    const passDetails = {
      fullName: gatePass.fullName,
      department: gatePass.department,
      rollNumber: gatePass.rollNumber,
      purpose: gatePass.purpose,
    };

    await sendRejectionEmail(
      gatePass.email,
      gatePass.fullName,
      passDetails,
      reason,
    );

    res.status(200).json({
      success: true,
      message: "Gate pass rejected successfully",
      data: gatePass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get dashboard statistics for admin
const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalRequests = await GatePass.countDocuments();
    const approvedRequests = await GatePass.countDocuments({
      status: "Approved",
    });
    const pendingRequests = await GatePass.countDocuments({
      status: "Pending",
    });
    const rejectedRequests = await GatePass.countDocuments({
      status: "Rejected",
    });

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalRequests,
        approvedRequests,
        pendingRequests,
        rejectedRequests,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get student dashboard statistics
const getStudentStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    const totalRequests = await GatePass.countDocuments({ studentId: userId });
    const approvedPasses = await GatePass.countDocuments({
      studentId: userId,
      status: "Approved",
    });
    const pendingPasses = await GatePass.countDocuments({
      studentId: userId,
      status: "Pending",
    });
    const rejectedPasses = await GatePass.countDocuments({
      studentId: userId,
      status: "Rejected",
    });

    res.status(200).json({
      success: true,
      data: {
        totalRequests,
        approvedPasses,
        pendingPasses,
        rejectedPasses,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
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
};
