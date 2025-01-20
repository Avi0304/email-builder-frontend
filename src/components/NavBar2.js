import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function NavBar2(props) {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleBack = () => {
    navigate("/template"); // Navigate to the home page ("/")
  };

  return (
    <div>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          display: "flex",
          flexWrap: "wrap", // Allow wrapping of items on smaller screens
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#333",
          color: "#fff",
          zIndex: 1000,
          boxSizing: "border-box",
        }}
      >
        <button
          style={{
            background: "#555",
            border: "none",
            color: "#fff",
            padding: "5px 15px",
            cursor: "pointer",
            minWidth: "80px",
          }}
          onClick={handleBack} // Call handleBack on click
        >
          &larr; Back
        </button>


      </nav>
      {/* Children content */}
      <div style={{ marginTop: "60px" }}>{props.children}</div>
    </div>
  );
}
