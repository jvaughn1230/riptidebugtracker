import React from "react";
import "./Bugcard.css";
import plankton from "../../assets/plankton.png";
import { formatForDisplay } from "../../utils/dateFormatter";
import SidePanel from "../SidePanel/SidePanel";

const BugCard = ({ bug, openModal }) => {
  const priorityMap = {
    1: "Low",
    2: "Regular",
    3: "High",
  };

  const getFormattedDueDate = bug.due ? formatForDisplay(bug.due) : "";

  return (
    <div className="bugcard-bg">
      <div className="bugcard-container">
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
            <h3>Project: </h3>
            <p>{bug.project ? bug.project.name : "Not Assigned"}</p>
          </div>

          <button onClick={openModal} className="bugcard__button">
            View Bug
          </button>
          {/* <SidePanel
            due={bug.due}
            created={bug.createdAt}
            completed={bug.status === 3}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default BugCard;
