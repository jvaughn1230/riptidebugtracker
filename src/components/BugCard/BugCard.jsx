import React from "react";
import "./BugCard.css";
import SidePanel from "../SidePanel/SidePanel";
import moment from "moment/moment";

const BugCard = ({ bug, openModal }) => {
  return (
    <div className="bug-card">
      <div className="bug-card-container">
        <div className="bug-card-content">
          <p className="large-text fade">{bug.issue} </p>
          <p className="small-text">
            <span className="fade">Project: </span>{" "}
            {bug.project?.name || "No Project Assigned"}
          </p>
          <p className="small-text">{bug.recreate}</p>
          <div className="flex bugcard-due-container">
            <p className="small-text fade">Due:</p>
            <p className="small-text due-date">
              {moment(bug.due).format("MM-DD-YYYY")}
            </p>
          </div>
          <button onClick={openModal} className="newbugcard__button">
            View Bug
          </button>
        </div>
        <div className="side-container">
          <SidePanel
            created={bug.createdAt}
            due={bug.due}
            completed={bug.CompletedAt}
          />
        </div>
      </div>
    </div>
  );
};

export default BugCard;
