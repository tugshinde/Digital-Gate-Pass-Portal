// Admin Dashboard Page
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toast";
import { gatePassAPI } from "../services/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentPasses, setRecentPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, passesRes] = await Promise.all([
        gatePassAPI.getDashboardStats(),
        gatePassAPI.getAllPasses(),
      ]);

      setStats(statsRes.data.data);
      setRecentPasses(passesRes.data.data.slice(0, 5));
    } catch (err) {
      setError("Failed to fetch dashboard data");
      console.error(err);
    } finally {
      setLoading(false);
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
          <div style={{ marginBottom: "30px" }}>
            <h1>Admin Dashboard</h1>
            <p>Manage gate pass requests and view statistics</p>
          </div>

          {error && <Toast message={error} type="error" />}

          {/* Dashboard Statistics */}
          <div className="dashboard-cards">
            <DashboardCard
              icon="👥"
              label="Total Students"
              value={stats?.totalStudents || 0}
            />
            <DashboardCard
              icon="📋"
              label="Total Requests"
              value={stats?.totalRequests || 0}
            />
            <DashboardCard
              icon="✅"
              label="Approved"
              value={stats?.approvedRequests || 0}
            />
            <DashboardCard
              icon="⏳"
              label="Pending"
              value={stats?.pendingRequests || 0}
            />
            <DashboardCard
              icon="❌"
              label="Rejected"
              value={stats?.rejectedRequests || 0}
            />
          </div>

          {/* Action Button */}
          <div style={{ marginBottom: "30px" }}>
            <button
              onClick={() => navigate("/admin/requests")}
              className="btn btn-primary"
            >
              📋 View All Requests
            </button>
          </div>

          {/* Recent Requests */}
          <div className="card">
            <h2>Recent Requests</h2>
            {recentPasses.length === 0 ? (
              <p>No gate pass requests yet.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Purpose</th>
                    <th>Out Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPasses.map((pass) => (
                    <tr key={pass._id}>
                      <td>{pass.fullName}</td>
                      <td>{pass.purpose}</td>
                      <td>{new Date(pass.outDate).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`badge badge-${pass.status.toLowerCase()}`}
                        >
                          {pass.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
