// Apply for Gate Pass Page
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";
import { gatePassAPI } from "../services/api";

const ApplyPass = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    department: "",
    rollNumber: "",
    purpose: "",
    outDate: "",
    outTime: "",
    returnDate: "",
    returnTime: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/student-login");
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (
      !formData.fullName ||
      !formData.department ||
      !formData.rollNumber ||
      !formData.purpose ||
      !formData.outDate ||
      !formData.outTime ||
      !formData.returnDate ||
      !formData.returnTime
    ) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await gatePassAPI.createGatePass(formData);
      setSuccess("Gate pass application submitted successfully!");

      setTimeout(() => {
        navigate("/student/my-passes");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to apply for gate pass");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <Navbar user={user} />
      <div style={{ display: "flex" }}>
        <Sidebar userRole="student" />
        <div className="main-content">
          <h1>Apply for Gate Pass</h1>
          <p>Submit a new gate pass application</p>

          {error && <div className="error-message">{error}</div>}
          {success && <Toast message={success} type="success" />}

          <div className="card" style={{ maxWidth: "600px" }}>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                  />
                </div>

                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Enter department"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Roll Number</label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    placeholder="Enter roll number"
                  />
                </div>

                <div className="form-group">
                  <label>Purpose</label>
                  <input
                    type="text"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    placeholder="Enter purpose"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Out Date</label>
                  <input
                    type="date"
                    name="outDate"
                    value={formData.outDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Out Time</label>
                  <input
                    type="time"
                    name="outTime"
                    value={formData.outTime}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Return Date</label>
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Return Time</label>
                  <input
                    type="time"
                    name="returnTime"
                    value={formData.returnTime}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "📝 Apply Pass"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/student/dashboard")}
                >
                  Back to Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPass;
