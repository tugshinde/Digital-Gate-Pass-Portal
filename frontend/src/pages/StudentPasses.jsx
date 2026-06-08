// Student Passes Page - View All Passes
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatusBadge from "../components/StatusBadge";
import QRCodeCard from "../components/QRCodeCard";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toast";
import { gatePassAPI } from "../services/api";

const StudentPasses = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [passes, setPasses] = useState([]);
  const [filteredPasses, setFilteredPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedPass, setSelectedPass] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/student-login");
      return;
    }
    setUser(JSON.parse(userData));
    fetchPasses();
  }, [navigate]);

  const fetchPasses = async () => {
    try {
      setLoading(true);
      const res = await gatePassAPI.getStudentPasses();
      setPasses(res.data.data);
      setFilteredPasses(res.data.data);
    } catch (err) {
      setError("Failed to fetch passes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = passes;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (pass) =>
          pass.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pass.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Status filter
    if (filterStatus) {
      filtered = filtered.filter((pass) => pass.status === filterStatus);
    }

    setFilteredPasses(filtered);
  }, [searchTerm, filterStatus, passes]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleEdit = (pass) => {
    setEditingId(pass._id);
    setEditFormData({
      fullName: pass.fullName,
      department: pass.department,
      rollNumber: pass.rollNumber,
      purpose: pass.purpose,
      outDate: pass.outDate.split("T")[0],
      outTime: pass.outTime,
      returnDate: pass.returnDate.split("T")[0],
      returnTime: pass.returnTime,
    });
  };

  const handleSaveEdit = async (passId) => {
    try {
      await gatePassAPI.updatePass(passId, editFormData);
      setError("");
      setEditingId(null);
      fetchPasses();
      alert("Pass updated successfully!");
    } catch (err) {
      setError("Failed to update pass");
    }
  };

  const handleDelete = async (passId) => {
    if (window.confirm("Are you sure you want to delete this pass?")) {
      try {
        await gatePassAPI.deletePass(passId);
        fetchPasses();
        alert("Pass deleted successfully!");
      } catch (err) {
        setError("Failed to delete pass");
      }
    }
  };

  if (!user) {
    return <LoadingSpinner />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Navbar user={user} />
      <div style={{ display: "flex" }}>
        <Sidebar userRole="student" />
        <div className="main-content">
          <h1>My Gate Passes</h1>
          <p>View and manage your gate pass requests</p>

          {error && <Toast message={error} type="error" />}

          <div className="card">
            <div style={{ marginBottom: "20px" }}>
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search by purpose or roll number..."
              />
              <FilterDropdown
                value={filterStatus}
                onChange={setFilterStatus}
                options={["Pending", "Approved", "Rejected"]}
                label="Filter by Status"
              />
            </div>

            {filteredPasses.length === 0 ? (
              <p>No gate passes found.</p>
            ) : (
              <div>
                {filteredPasses.map((pass) => (
                  <div
                    key={pass._id}
                    style={{
                      background: "#f9f9f9",
                      padding: "15px",
                      marginBottom: "15px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                    }}
                  >
                    {editingId === pass._id ? (
                      // Edit Form
                      <div>
                        <h3>Edit Pass</h3>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Full Name</label>
                            <input
                              type="text"
                              name="fullName"
                              value={editFormData.fullName}
                              onChange={handleEditChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Department</label>
                            <input
                              type="text"
                              name="department"
                              value={editFormData.department}
                              onChange={handleEditChange}
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>Roll Number</label>
                            <input
                              type="text"
                              name="rollNumber"
                              value={editFormData.rollNumber}
                              onChange={handleEditChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Purpose</label>
                            <input
                              type="text"
                              name="purpose"
                              value={editFormData.purpose}
                              onChange={handleEditChange}
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>Out Date</label>
                            <input
                              type="date"
                              name="outDate"
                              value={editFormData.outDate}
                              onChange={handleEditChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Out Time</label>
                            <input
                              type="time"
                              name="outTime"
                              value={editFormData.outTime}
                              onChange={handleEditChange}
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>Return Date</label>
                            <input
                              type="date"
                              name="returnDate"
                              value={editFormData.returnDate}
                              onChange={handleEditChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Return Time</label>
                            <input
                              type="time"
                              name="returnTime"
                              value={editFormData.returnTime}
                              onChange={handleEditChange}
                            />
                          </div>
                        </div>

                        <div style={{ marginTop: "15px" }}>
                          <button
                            onClick={() => handleSaveEdit(pass._id)}
                            className="btn btn-success btn-small"
                            style={{ marginRight: "10px" }}
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="btn btn-secondary btn-small"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <h3>{pass.purpose}</h3>
                            <p>
                              <strong>Roll Number:</strong> {pass.rollNumber}
                            </p>
                            <p>
                              <strong>Department:</strong> {pass.department}
                            </p>
                            <p>
                              <strong>Out Date:</strong>{" "}
                              {new Date(pass.outDate).toLocaleDateString()} at{" "}
                              {pass.outTime}
                            </p>
                            <p>
                              <strong>Return Date:</strong>{" "}
                              {new Date(pass.returnDate).toLocaleDateString()}{" "}
                              at {pass.returnTime}
                            </p>
                            <p>
                              <strong>Status:</strong>{" "}
                              <StatusBadge status={pass.status} />
                            </p>
                            {pass.rejectionReason && (
                              <p
                                style={{ color: "#d63031", marginTop: "10px" }}
                              >
                                <strong>Rejection Reason:</strong>{" "}
                                {pass.rejectionReason}
                              </p>
                            )}
                          </div>

                          <div>
                            {pass.status === "Pending" && (
                              <div style={{ marginBottom: "10px" }}>
                                <button
                                  onClick={() => handleEdit(pass)}
                                  className="btn btn-primary btn-small"
                                  style={{
                                    marginBottom: "5px",
                                    display: "block",
                                  }}
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(pass._id)}
                                  className="btn btn-danger btn-small"
                                  style={{ display: "block" }}
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            )}

                            {pass.status === "Approved" && pass.qrCode && (
                              <QRCodeCard
                                qrCode={pass.qrCode}
                                passId={pass._id}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() => navigate("/student/dashboard")}
              className="btn btn-secondary"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPasses;
