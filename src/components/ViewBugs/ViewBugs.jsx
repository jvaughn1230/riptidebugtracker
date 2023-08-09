import React, { useEffect } from "react";
import "./ViewBugs.css";
import BugCard from "../BugCard/BugCard";
import { useDispatch, useSelector } from "react-redux";

const bugsData = ["bug1", "bug2"];
const ViewBugs = () => {
  const dispatch = useDispatch();

  // TODO: Update to fetch bugs from DB
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
