// GatePass Model
const mongoose = require("mongoose");

const gatePassSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    rollNumber: {
      type: String,
      required: [true, "Roll number is required"],
      trim: true,
    },
    purpose: {
      type: String,
      required: [true, "Purpose is required"],
      trim: true,
    },
    outDate: {
      type: Date,
      required: [true, "Out date is required"],
    },
    outTime: {
      type: String,
      required: [true, "Out time is required"],
    },
    returnDate: {
      type: Date,
      required: [true, "Return date is required"],
    },
    returnTime: {
      type: String,
      required: [true, "Return time is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    qrCode: {
      type: String,
      default: null,
    },
    rejectionReason: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("GatePass", gatePassSchema);
