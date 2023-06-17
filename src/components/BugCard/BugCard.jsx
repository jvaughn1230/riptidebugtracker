import React from "react";
import "./bugcard.css";

const BugCard = (bug) => {
  // TODO: Need to have something that checks for changes and then have a update bug button to update bug
  return (
    <div className="bugcard">
      <h2>Bug Name</h2>
      <div className="card-row">
        <h3>Details:</h3>
        <p>Details Here</p>
      </div>
      <div className="card-row">
        {" "}
        <h3>Priority:</h3>
        <p>Priority Level</p>
      </div>
      <div className="card-row">
        {" "}
        <h3>Status:</h3>
        <p>Complete, In progress, Not Started</p>
      </div>
      <div className="card-row">
        <h3>Due Date:</h3>
        <p>Due Date Here</p>
      </div>

      <button>View Bug</button>
    </div>
  );
};

export default BugCard;
