// Admin Requests Page - Manage All Requests
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatusBadge from "../components/StatusBadge";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toast";
import { gatePassAPI } from "../services/api";

const AdminRequests = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [passes, setPasses] = useState([]);
  const [filteredPasses, setFilteredPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedPass, setSelectedPass] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/admin-login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== "admin") {
      navigate("/");
      return;
    }

    setUser(parsedUser);
    fetchPasses();
  }, [navigate]);

  const fetchPasses = async () => {
    try {
      setLoading(true);
      const res = await gatePassAPI.getAllPasses();
      setPasses(res.data.data);
      setFilteredPasses(res.data.data);
    } catch (err) {
      setError("Failed to fetch requests");
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
          pass.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pass.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Status filter
    if (filterStatus) {
      filtered = filtered.filter((pass) => pass.status === filterStatus);
    }

    setFilteredPasses(filtered);
  }, [searchTerm, filterStatus, passes]);

  const handleApprove = async (passId) => {
    try {
      await gatePassAPI.approvePass(passId);
      setError("");
      alert("Pass approved successfully!");
      fetchPasses();
    } catch (err) {
      setError("Failed to approve pass");
    }
  };

  const handleRejectClick = (pass) => {
    setSelectedPass(pass);
    setShowModal(true);
  };

  const handleRejectSubmit = async () => {
    if (!rejectionReason.trim()) {
      alert("Please enter a rejection reason");
      return;
    }

    try {
      await gatePassAPI.rejectPass(selectedPass._id, {
        reason: rejectionReason,
      });
      setError("");
      alert("Pass rejected successfully! Email notification sent.");
      setShowModal(false);
      setRejectionReason("");
      setSelectedPass(null);
      fetchPasses();
    } catch (err) {
      setError("Failed to reject pass");
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
        <Sidebar userRole="admin" />
        <div className="main-content">
          <h1>Manage Requests</h1>
          <p>Review and manage all gate pass requests</p>

          {error && <Toast message={error} type="error" />}

          <div className="card">
            <div style={{ marginBottom: "20px" }}>
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search by student name or roll number..."
              />
              <FilterDropdown
                value={filterStatus}
                onChange={setFilterStatus}
                options={["Pending", "Approved", "Rejected"]}
                label="Filter by Status"
              />
            </div>

            {filteredPasses.length === 0 ? (
              <p>No requests found.</p>
            ) : (
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Department</th>
                      <th>Roll No.</th>
                      <th>Purpose</th>
                      <th>Out Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPasses.map((pass) => (
                      <tr key={pass._id}>
                        <td>{pass.fullName}</td>
                        <td>{pass.department}</td>
                        <td>{pass.rollNumber}</td>
                        <td>{pass.purpose}</td>
                        <td>{new Date(pass.outDate).toLocaleDateString()}</td>
                        <td>
                          <StatusBadge status={pass.status} />
                        </td>
                        <td>
                          <div className="table-actions">
                            {pass.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => handleApprove(pass._id)}
                                  className="btn btn-success btn-small"
                                >
                                  ✅ Approve
                                </button>
                                <button
                                  onClick={() => handleRejectClick(pass)}
                                  className="btn btn-danger btn-small"
                                >
                                  ❌ Reject
                                </button>
                              </>
                            )}
                            {pass.status !== "Pending" && (
                              <button
                                onClick={() =>
                                  alert(
                                    `Pass ${pass.status.toLowerCase()} on ${new Date(pass.updatedAt).toLocaleDateString()}`,
                                  )
                                }
                                className="btn btn-secondary btn-small"
                              >
                                📋 Details
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="btn btn-secondary"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Rejection Modal */}
      {showModal && (
        <div className="modal-overlay active">
          <div className="modal-content">
            <div className="modal-header">
              Reject Gate Pass Request
              <span className="modal-close" onClick={() => setShowModal(false)}>
                ×
              </span>
            </div>

            <div className="form-group">
              <label>Rejection Reason</label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter reason for rejection"
                style={{ minHeight: "100px" }}
              />
            </div>

            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
              <button onClick={handleRejectSubmit} className="btn btn-danger">
                Reject
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRequests;
