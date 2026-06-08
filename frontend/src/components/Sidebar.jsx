// Sidebar Component
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ userRole }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="sidebar">
      <div className="sidebar-title">Menu</div>
      <ul className="sidebar-menu">
        {userRole === "student" && (
          <>
            <li>
              <Link
                to="/student/dashboard"
                className={isActive("/student/dashboard")}
              >
                📊 Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/student/apply-pass"
                className={isActive("/student/apply-pass")}
              >
                📝 Apply Pass
              </Link>
            </li>
            <li>
              <Link
                to="/student/my-passes"
                className={isActive("/student/my-passes")}
              >
                📋 My Passes
              </Link>
            </li>
          </>
        )}

        {userRole === "admin" && (
          <>
            <li>
              <Link
                to="/admin/dashboard"
                className={isActive("/admin/dashboard")}
              >
                📊 Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/requests"
                className={isActive("/admin/requests")}
              >
                📋 All Requests
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
