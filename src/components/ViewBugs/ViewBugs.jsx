import React from "react";
import "./ViewBugs.css";
import BugCard from "../BugCard/BugCard";
import { bugsData } from "../../tempbug";

const ViewBugs = () => {
  const bugs = bugsData.map((bug, index) => {
    return <BugCard key={index} bug={bug} />;
  });
  return (
    <div className="viewbugs">
      <h1 className="viewbugs-title">View Bugs</h1>
      <div className="buglist">{bugs}</div>
    </div>
  );
};

export default ViewBugs;
