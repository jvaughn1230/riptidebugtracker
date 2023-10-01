import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/riptide-white.png";
import AddBug from "../AddBug/AddBug";
import AddProject from "../addProject/AddProject";
import Logout from "../Logout/Logout";
import "./navbar.css";

const Navbar = () => {
  const [isBugModalOpen, setIsBugModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const openBugModal = () => setIsBugModalOpen(true);
  const closeBugModal = () => setIsBugModalOpen(false);

  const openProjectModal = () => setIsProjectModalOpen(true);
  const closeProjectModal = () => setIsProjectModalOpen(false);

  return (
    <div className="navbar">
      <img src={logo} alt="riptide logo" className="navbar-logo" />
      <div className="links-container">
        <Link to="/account">Home</Link>
        <Link to="/account/viewbugs">View Bugs</Link>
        <Link to="/wave">Wave</Link>
        <div className="line"></div>
        <Link onClick={openBugModal}>Add Bug</Link>
        {isBugModalOpen && <AddBug closeModal={closeBugModal} />}
        <Link onClick={openProjectModal}>Add Project</Link>
        {isProjectModalOpen && <AddProject closeModal={closeProjectModal} />}
      </div>

      <Logout />
    </div>
  );
};

export default Navbar;
