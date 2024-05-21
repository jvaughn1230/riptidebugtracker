import React from "react";
import "./ViewBugs.css";
// import BugModalContainer from "../../components/BugModalContainer";
import BugList from "../../components/BugList";

const ViewBugs = () => {
  return (
    <div className="view-bugs">
      <h1 className="view-bugs-title">View Bugs</h1>
      <div className="bug-list">
        <BugList />
      </div>
    </div>
  );
};

export default ViewBugs;
