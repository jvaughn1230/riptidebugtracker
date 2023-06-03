import React from "react";
import "./bugcard.css";

const BugCard = (bug) => {
  // TODO: Need to have something that checks for changes and then have a update bug button to update bug
  return (
    <div className="bugcard">
      <h2>{bug.title}</h2>
      <h3>Details:</h3>
      <p>{bug.details}</p>
      <h3>Comments:</h3>
      <h3>Priority:</h3>
      <h3>Status:</h3>
    </div>
  );
};

export default BugCard;
