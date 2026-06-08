// Navbar Component
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-brand">🏫 Smart Gate Pass Portal</div>
      <div className="navbar-menu">
        <span>Welcome, {user?.firstName}</span>
        <button className="btn btn-danger btn-small" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
