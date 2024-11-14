"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#3d3d3d",
      }}
    >
      <p>&copy; Created by Logan, Nathan, and Soraya</p>
      <p>
        <a href="#home" style={{ marginRight: "15px" }}>
          Privacy Policy
        </a>
        <a href="#home">Terms of Service</a>
      </p>
    </footer>
  );
};

export default Footer;
