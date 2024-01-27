import React, { useState } from "react";
import "./bugcard.css";
import BugModal from "../bugModal/BugModal";
import plankton from "../../assets/plankton.png";

const BugCard = ({ bug }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  // helper functions
  function getPriorityText(priority) {
    const priorityMap = {
      1: "Low",
      2: "Regular",
      3: "High",
    };
    return priorityMap[priority] || "Unknown";
  }

  function getStatus(status) {
    const statusMap = {
      1: "Open",
      2: "In Progress",
      3: "Complete",
    };
    return statusMap[status] || "Unknown";
  }

  const formattedDueDate = bug.due
    ? new Date(bug.due).toLocaleDateString("en-US")
    : "";

  return (
    <div className="bugcard-bg">
      <div className="bugcard">
        <img src={plankton} alt="plankton" className="card-plankton" />
        <div className="card-row">
          <h3>Priority:</h3>
          <p> {getPriorityText(bug.priority)}</p>
        </div>
        <div className="card-row">
          <h3>Due:</h3>
          <p>{formattedDueDate}</p>
        </div>
        <div className="card-row">
          <h3>Status: </h3>
          <p>{getStatus(bug.status)}</p>{" "}
        </div>

        <button onClick={openModal} className="bugcard__button">
          View Bug
        </button>
        {isModalOpen && <BugModal closeModal={closeModal} bug={bug} />}
      </div>
    </div>
  );
};

export default BugCard;
