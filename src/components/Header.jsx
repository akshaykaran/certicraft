import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="header">
      <div className="logo">
        <AccountBalanceWalletTwoToneIcon style={{ color: "#363B98" }} />
        <h4 onClick={handleClick} style={{ cursor: "pointer" }}>
          CERTICRAFT
        </h4>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>

      <nav className={`navbar ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>
          About Us
        </Link>
        <Link to="/view-certificate" onClick={() => setMenuOpen(false)}>
          View Certificate
        </Link>
        <Link to="/generate-certificate" onClick={() => setMenuOpen(false)}>
          Generate Certificate
        </Link>
      </nav>
    </div>
  );
};

export default Header;
