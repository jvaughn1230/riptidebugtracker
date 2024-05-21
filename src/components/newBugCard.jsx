import React from "react";
import "./NewBugCard.css";
import SidePanel from "./SidePanel/SidePanel";
import moment from "moment/moment";

const NewBugCard = ({ bug }) => {
  return (
    <div className="outer">
      <div className="layer2">
        <div className="test-content-card">
          <p className="large-text-test fade">Id: {bug._id} </p>
          <p className="large-text-test">{bug.issue}</p>
          <p className="small-text-test">{bug.recreate}</p>
          <div>
            <p className="small-text-test fade">Deadline:</p>
            <p className="small-text-test">
              {moment(bug.due).format("MM-DD-YYYY")}
            </p>
          </div>
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

export default NewBugCard;
