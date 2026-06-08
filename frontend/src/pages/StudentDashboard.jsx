// Student Dashboard Page
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import StatusBadge from "../components/StatusBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toast";
import { gatePassAPI } from "../services/api";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentPasses, setRecentPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/student-login");
      return;
    }

    setUser(JSON.parse(userData));
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, passesRes] = await Promise.all([
        gatePassAPI.getStudentStats(),
        gatePassAPI.getStudentPasses(),
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
        <Sidebar userRole="student" />
        <div className="main-content">
          <div style={{ marginBottom: "30px" }}>
            <h1>Welcome, {user.firstName}!</h1>
            <p>Manage your gate pass requests</p>
          </div>

          {error && <Toast message={error} type="error" />}

          {/* Dashboard Statistics */}
          <div className="dashboard-cards">
            <DashboardCard
              icon="📋"
              label="Total Requests"
              value={stats?.totalRequests || 0}
            />
            <DashboardCard
              icon="✅"
              label="Approved"
              value={stats?.approvedPasses || 0}
            />
            <DashboardCard
              icon="⏳"
              label="Pending"
              value={stats?.pendingPasses || 0}
            />
            <DashboardCard
              icon="❌"
              label="Rejected"
              value={stats?.rejectedPasses || 0}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ marginBottom: "30px" }}>
            <button
              onClick={() => navigate("/student/apply-pass")}
              className="btn btn-primary"
              style={{ marginRight: "10px" }}
            >
              📝 Apply for Gate Pass
            </button>
            <button
              onClick={() => navigate("/student/my-passes")}
              className="btn btn-secondary"
            >
              📋 View All Passes
            </button>
          </div>

          {/* Recent Passes */}
          <div className="card">
            <h2>Recent Requests</h2>
            {recentPasses.length === 0 ? (
              <p>
                No gate pass requests yet.{" "}
                <a
                  href="/student/apply-pass"
                  style={{ color: "#4a69f0", cursor: "pointer" }}
                >
                  Apply now
                </a>
              </p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Purpose</th>
                    <th>Out Date</th>
                    <th>Return Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPasses.map((pass) => (
                    <tr key={pass._id}>
                      <td>{pass.purpose}</td>
                      <td>{new Date(pass.outDate).toLocaleDateString()}</td>
                      <td>{new Date(pass.returnDate).toLocaleDateString()}</td>
                      <td>
                        <StatusBadge status={pass.status} />
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

export default StudentDashboard;
