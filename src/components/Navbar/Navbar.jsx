import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/riptide-white.png";
import AddBug from "../AddBug/AddBug";
import Logout from "../Logout/Logout";
import "./navbar.css";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="navbar">
      <img src={logo} alt="riptide logo" className="navbar-logo" />
      <div className="links-container">
        <Link to="/account">Home</Link>
        <Link to="/account/viewbugs">View Bugs</Link>
        <Link to="/wave">Wave</Link>
        <Link onClick={openModal}>Add Bug</Link>
        {isModalOpen && <AddBug closeModal={closeModal} />}
      </div>

      <Logout />
    </div>
  );
};

export default Navbar;
