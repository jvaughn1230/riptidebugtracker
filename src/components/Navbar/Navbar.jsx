import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/riptide-white.png";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="riptide logo" className="navbar-logo" />
      <div className="links-container">
        <Link to="/account">Home</Link>
        <Link to="/account/viewbugs">View Bugs</Link>
        <Link to="/account/addbug">Add Bug</Link>
      </div>

      <Link to="/" className="signout-link">
        Sign Out
      </Link>
    </div>
  );
};

export default Navbar;
