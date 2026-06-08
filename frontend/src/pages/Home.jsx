// Home Page
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: "#0F1419" }}>
      {/* Top Bar with CDAC Accreditation */}
      <div style={{
        background: "linear-gradient(90deg, #1E40AF 0%, #3B82F6 100%)",
        padding: "12px 40px",
        textAlign: "center",
        fontSize: "14px",
        color: "white",
        fontWeight: "500"
      }}>
        ✨ Ministry of Electronics & Information Technology (MeitY) • Government of India
      </div>

      {/* Header with Glassmorphism */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          position: "sticky",
          top: "0",
          zIndex: "100",
        }}
      >
        <div>
          <h1 style={{ fontSize: "28px", marginBottom: "2px", color: "white", fontWeight: "bold", letterSpacing: "0.5px" }}>
            🏛️ CDAC Guard
          </h1>
          <p style={{ color: "#A0AEC0", fontSize: "12px", margin: "0" }}>
            Centre for Development of Advanced Computing
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => navigate("/student-login")}
            style={{
              background: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)",
              color: "white",
              border: "none",
              padding: "11px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              boxShadow: "0 4px 15px rgba(30, 64, 175, 0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(30, 64, 175, 0.6)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(30, 64, 175, 0.4)";
            }}
          >
            Student Login
          </button>
          <button
            onClick={() => navigate("/admin-login")}
            style={{
              background: "transparent",
              color: "#3B82F6",
              border: "2px solid #3B82F6",
              padding: "9px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#3B82F6";
              e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#3B82F6";
            }}
          >
            Admin Login
          </button>
        </div>
      </div>

      {/* Hero Section with Animated Gradient */}
      <div style={{
        background: "linear-gradient(135deg, rgba(30, 64, 175, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)",
        padding: "60px 40px",
        borderBottom: "1px solid rgba(30, 64, 175, 0.2)",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(30, 64, 175, 0.15)", padding: "10px 20px", borderRadius: "25px", marginBottom: "25px", border: "1px solid rgba(30, 64, 175, 0.3)" }}>
            <span style={{ color: "#3B82F6", fontSize: "13px", fontWeight: "600", letterSpacing: "0.5px" }}>🔒 SECURE GOVERNMENT SOLUTION</span>
          </div>
          <h1 style={{ fontSize: "54px", fontWeight: "900", color: "white", marginBottom: "12px", lineHeight: "1.1", letterSpacing: "-1px" }}>
            CDAC Guard
          </h1>
          <h2 style={{ fontSize: "36px", fontWeight: "700", background: "linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "25px" }}>
            Advanced Computing Access
          </h2>
          <p style={{ color: "#CBD5E1", fontSize: "17px", lineHeight: "1.8", marginBottom: "12px", maxWidth: "700px" }}>
            State-of-the-art digital access management system designed for government institutions and research centers with advanced security features.
          </p>
          <p style={{ color: "#94A3B8", fontSize: "15px", lineHeight: "1.7", marginBottom: "35px", maxWidth: "700px" }}>
            Secure QR-based access verification, real-time tracking, comprehensive audit logs, and seamless integration for researchers, faculty, visitors, and government officials.
          </p>
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/student-login")}
              style={{
                background: "linear-gradient(135deg, #DC2626 0%, #EF4444 100%)",
                color: "white",
                border: "none",
                padding: "14px 32px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "600",
                boxShadow: "0 4px 15px rgba(220, 38, 38, 0.4)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 8px 25px rgba(220, 38, 38, 0.6)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(220, 38, 38, 0.4)";
              }}
            >
              {/* 👤 Visitor Registration
            </button>
            <button
              onClick={() => navigate("/student-login")}
              style={{
                background: "linear-gradient(135deg, #059669 0%, #10B981 100%)",
                color: "white",
                border: "none",
                padding: "14px 32px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "600",
                boxShadow: "0 4px 15px rgba(5, 150, 105, 0.4)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 8px 25px rgba(5, 150, 105, 0.6)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(5, 150, 105, 0.4)";
              }}
            > */}
              🎫 Get Access Pass
            </button>
          </div>

          {/* Stats with Modern Design */}
          <div style={{ display: "flex", gap: "50px", paddingTop: "50px", marginTop: "50px", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
            {[
              { icon: "🏛️", value: "11", label: "Centers Across India" },
              { icon: "👨‍💻", value: "2000+", label: "Research Professionals" },
              { icon: "📅", value: "40+", label: "Years of Excellence" },
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>{stat.icon}</div>
                <div style={{ fontSize: "32px", fontWeight: "bold", background: "linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {stat.value}
                </div>
                <div style={{ color: "#94A3B8", fontSize: "13px", marginTop: "4px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: "60px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "white", marginBottom: "50px", textAlign: "center" }}>
            Advanced Computing Solutions
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px" }}>
            {[
              { icon: "🔐", title: "Secure Authentication", desc: "Multi-factor authentication with biometric verification" },
              { icon: "📊", title: "Real-Time Monitoring", desc: "Live tracking with comprehensive audit trails" },
              { icon: "⚡", title: "Instant Processing", desc: "Automated pass generation and email delivery" },
              { icon: "🏛️", title: "Government Integration", desc: "Seamless integration with government systems" },
              { icon: "🔬", title: "Research Access", desc: "Specialized access for research facilities" },
              { icon: "📱", title: "Mobile Compatible", desc: "QR code scanning with mobile applications" },
            ].map((feature, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(30, 64, 175, 0.2)",
                  padding: "30px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform: hoveredCard === i ? "translateY(-8px)" : "translateY(0)",
                  boxShadow: hoveredCard === i ? "0 20px 40px rgba(30, 64, 175, 0.2)" : "0 5px 15px rgba(0, 0, 0, 0.2)",
                }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={{ fontSize: "36px", marginBottom: "15px" }}>{feature.icon}</div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "white", marginBottom: "10px" }}>
                  {feature.title}
                </h3>
                <p style={{ color: "#94A3B8", fontSize: "14px", lineHeight: "1.6" }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CDAC Information Section */}
      <div style={{ background: "linear-gradient(180deg, rgba(30, 64, 175, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)", padding: "60px 40px", borderTop: "1px solid rgba(30, 64, 175, 0.2)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
          {/* Left Side */}
          <div>
            <h2 style={{ fontSize: "40px", fontWeight: "bold", color: "white", marginBottom: "20px" }}>
              About<br />CDAC
            </h2>
            <p style={{ color: "#CBD5E1", fontSize: "16px", lineHeight: "1.8", marginBottom: "40px" }}>
              Centre for Development of Advanced Computing (CDAC) is the premier R&D organization of the Ministry of Electronics and Information Technology (MeitY) for carrying out R&D in IT, Electronics and associated areas.
            </p>

            <div style={{ marginBottom: "25px" }}>
              {[
                { icon: "🏛️", title: "Headquarters", text: "Pune, Maharashtra, India" },
                { icon: "📞", title: "Contact", text: "+91-20-25503100 / +91-20-25503131" },
                { icon: "✉️", title: "Email", text: "info@cdac.in" },
                { icon: "🏆", title: "Recognition", text: "MeitY • Government of India • ISO Certified" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
                  <div style={{ background: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)", padding: "12px", borderRadius: "8px", fontSize: "20px", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ color: "white", margin: "0 0 4px 0", fontWeight: "600", fontSize: "15px" }}>{item.title}</h4>
                    <p style={{ color: "#94A3B8", margin: "0", fontSize: "14px" }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Access Card */}
          <div>
            <div style={{ background: "linear-gradient(135deg, rgba(30, 64, 175, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%)", border: "1px solid rgba(30, 64, 175, 0.3)", padding: "45px", borderRadius: "16px", boxShadow: "0 20px 60px rgba(30, 64, 175, 0.2)" }}>
              <h3 style={{ color: "white", fontSize: "26px", fontWeight: "700", marginBottom: "12px" }}>🔐 Secure Access Portal</h3>
              <p style={{ color: "#CBD5E1", fontSize: "15px", marginBottom: "35px", lineHeight: "1.6" }}>
                Quick access to CDAC facilities and research centers across India
              </p>

              {[
                { label: "Visitor Registration", color: "#DC2626", onClick: () => navigate("/student-login") },
                { label: "Research Access", color: "#059669", onClick: () => navigate("/student-login") },
                { label: "Student Login", color: "#3B82F6", onClick: () => navigate("/student-login") },
              ].map((btn, i) => (
                <button
                  key={i}
                  onClick={btn.onClick}
                  style={{
                    width: "100%",
                    background: `linear-gradient(135deg, ${btn.color} 0%, ${btn.color}dd 100%)`,
                    color: "white",
                    border: "none",
                    padding: "14px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "15px",
                    fontWeight: "600",
                    marginBottom: "12px",
                    boxShadow: `0 4px 15px ${btn.color}40`,
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow = `0 8px 25px ${btn.color}60`;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = `0 4px 15px ${btn.color}40`;
                  }}
                >
                  {btn.label}
                </button>
              ))}

              <div style={{ display: "flex", gap: "12px", marginTop: "15px" }}>
                <button
                  onClick={() => navigate("/admin-login")}
                  style={{
                    flex: 1,
                    background: "transparent",
                    color: "white",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                    padding: "12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.borderColor = "rgba(59, 130, 246, 0.6)";
                    e.target.style.background = "rgba(59, 130, 246, 0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                    e.target.style.background = "transparent";
                  }}
                >
                  Admin
                </button>
                <button
                  style={{
                    flex: 1,
                    background: "transparent",
                    color: "white",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                    padding: "12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.borderColor = "rgba(59, 130, 246, 0.6)";
                    e.target.style.background = "rgba(59, 130, 246, 0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                    e.target.style.background = "transparent";
                  }}
                >
                  Security
                </button>
              </div>

              <p style={{ color: "#64748B", fontSize: "12px", textAlign: "center", marginTop: "25px", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
                🔐 Government-grade security for CDAC facilities
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(10px)", padding: "40px 40px", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "40px", marginBottom: "30px" }}>
          <div>
            <div style={{ color: "white", fontWeight: "700", marginBottom: "8px", fontSize: "16px" }}>🏛️ CDAC</div>
            <div style={{ color: "#94A3B8", fontSize: "13px", lineHeight: "1.8" }}>Centre for Development of Advanced Computing<br />Ministry of Electronics & IT, Govt. of India</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#CBD5E1", marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>© 2026 CDAC Guard</div>
            <div style={{ color: "#64748B", fontSize: "12px" }}>Advanced Computing Access Management System</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <a href="https://cdac.in/" style={{ color: "#3B82F6", textDecoration: "none", marginLeft: "15px", fontSize: "14px", fontWeight: "600" }}>cdac.in</a>
            <a href="https://www.meity.gov.in/" style={{ color: "#3B82F6", textDecoration: "none", marginLeft: "15px", fontSize: "14px", fontWeight: "600" }}>MeitY</a>
          </div>
        </div>
        <div style={{ textAlign: "center", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.1)", color: "#64748B", fontSize: "12px" }}>
          All rights reserved. Developed for CDAC Research Centers.
        </div>
      </div>
    </div>
  );
};

export default Home;
