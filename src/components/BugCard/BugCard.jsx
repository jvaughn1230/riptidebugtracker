import React, { useState } from "react";
// import { DateTime } from "luxon";
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

  // helper function
  function getPriorityText(priority) {
    const priorityMap = {
      1: "Low",
      2: "Medium",
      3: "High",
    };
    return priorityMap[priority] || "Unknown";
  }

  const formattedDueDate = bug.due
    ? new Date(bug.due).toLocaleDateString("en-US")
    : "";

  var dueDate = new Date(bug.due);
  const updatedDue = dueDate.toLocaleString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    <div className="bugcard">
      <img src={plankton} alt="plankton" className="card-plankton" />
      <div className="card-row">
        <h3>Issue: </h3>
        <p>{bug.issue}</p>
      </div>
      <div className="card-row">
        {" "}
        <h3>Priority:</h3>
        <p> {getPriorityText(bug.priority)}</p>
      </div>
      <div className="card-row">
        {" "}
        <h3>Due:</h3>
        <p>{formattedDueDate}</p>
      </div>

      <button onClick={openModal} className="bugcard__button">
        View Bug
      </button>
      {isModalOpen && <BugModal closeModal={closeModal} bug={bug} />}
    </div>
  );
};

export default BugCard;
