// DashboardCard Component
import React from "react";

const DashboardCard = ({ label, value, icon }) => {
  return (
    <div className="dashboard-card">
      <div style={{ fontSize: "32px" }}>{icon}</div>
      <div className="dashboard-card-value">{value}</div>
      <div className="dashboard-card-label">{label}</div>
    </div>
  );
};

export default DashboardCard;
