import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import logo from "../../assets/riptide-white.png";
import AddBug from "../AddBug/AddBug";
import AddProject from "../addProject/AddProject";
import Logout from "../Logout/Logout";
import "./navbar.css";

const Navbar = () => {
  const [isBugModalOpen, setIsBugModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  const openBugModal = () => setIsBugModalOpen(true);
  const closeBugModal = () => setIsBugModalOpen(false);

  const openProjectModal = () => setIsProjectModalOpen(true);
  const closeProjectModal = () => setIsProjectModalOpen(false);

  return (
    <div className="navbar">
      <img src={logo} alt="riptide logo" className="navbar-logo" />

      {/* Desktop Links */}
      <div className="desktop-links-container">
        <Link to="/account">Home</Link>
        <Link to="/account/viewbugs">View Bugs</Link>
        <Link to="/account/projects">My Projects</Link>
        <div className="line"></div>
        <Link onClick={openBugModal}>Add Bug</Link>
        {isBugModalOpen && <AddBug closeModal={closeBugModal} />}
        <Link onClick={openProjectModal}>Add Project</Link>
        {isProjectModalOpen && <AddProject closeModal={closeProjectModal} />}
      </div>

      {/* Mobile Links */}
      <div className="mobile-menu-container">
        <GiHamburgerMenu
          className="hamburger"
          onClick={() => setToggleMenu(true)}
        />
        <div className={`${toggleMenu ? "openMobileMenu" : "closeMobileMenu"}`}>
          <div className="mobile-nav-container">
            <AiOutlineCloseCircle
              onClick={() => setToggleMenu(false)}
              className="mobilenav__exit"
            />
            <Link
              to="/account"
              className="mobilenav__link"
              onClick={() => setToggleMenu(false)}
            >
              Home
            </Link>
            <Link
              to="/account/viewbugs"
              className="mobilenav__link"
              onClick={() => setToggleMenu(false)}
            >
              View Bugs
            </Link>
            <Link
              to="/account/projects"
              className="mobilenav__link"
              onClick={() => setToggleMenu(false)}
            >
              My Projects
            </Link>
            <div className="line"></div>
            <Link onClick={openBugModal} className="mobilenav__link">
              Add Bug
            </Link>
            {isBugModalOpen && <AddBug closeModal={closeBugModal} />}
            <Link onClick={openProjectModal} className="mobilenav__link">
              Add Project
            </Link>
            {isProjectModalOpen && (
              <AddProject closeModal={closeProjectModal} />
            )}
            <Logout className="mobilenav__button" />
          </div>
        </div>
      </div>

      <Logout className="desktop-button" />
    </div>
  );
};

export default Navbar;
