import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
      <Link to="/view-certificate">View Certificate</Link>
      <Link to="/generate-certificate">Generate Certificate</Link>
    </nav>
  );
};

export default Header;
