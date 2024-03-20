import React from "react";
import "./bugcard.css";
import plankton from "../../assets/plankton.png";
import useDateFormatter from "../../hooks/useDateFormatter";

const BugCard = ({ bug, openModal }) => {
  const { formatForDisplay } = useDateFormatter();

  const priorityMap = {
    1: "Low",
    2: "Regular",
    3: "High",
  };

  const statusMap = {
    1: "Open",
    2: "In Progress",
    3: "Complete",
  };

  const getFormattedDueDate = bug.due ? formatForDisplay(bug.due) : "";

  return (
    <div className="bugcard-bg">
      <div className="bugcard">
        <img src={plankton} alt="plankton" className="card-plankton" />
        <div className="card-row">
          <h3>Priority:</h3>
          <p>{priorityMap[bug.priority] || "Unknown"}</p>
        </div>
        <div className="card-row">
          <h3>Due:</h3>
          <p>{getFormattedDueDate}</p>
        </div>
        <div className="card-row">
          <h3>Status: </h3>
          <p>{statusMap[bug.status]}</p>
        </div>

        <button onClick={openModal} className="bugcard__button">
          View Bug
        </button>
      </div>
    </div>
  );
};

export default BugCard;
