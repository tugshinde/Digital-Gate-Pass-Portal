// StatusBadge Component
import React from "react";

const StatusBadge = ({ status }) => {
  let badgeClass = "badge-pending";

  if (status === "Approved") {
    badgeClass = "badge-approved";
  } else if (status === "Rejected") {
    badgeClass = "badge-rejected";
  } else if (status === "Pending") {
    badgeClass = "badge-pending";
  }

  return <span className={`badge ${badgeClass}`}>{status}</span>;
};

export default StatusBadge;
