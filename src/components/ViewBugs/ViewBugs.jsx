import React, { useEffect } from "react";
import "./ViewBugs.css";
import BugCard from "../BugCard/BugCard";
import { bugsData } from "../../tempbug";
import { useDispatch, useSelector } from "react-redux";
import { getBugs } from "../../redux/bugSlice";

const ViewBugs = () => {
  const dispatch = useDispatch();

  // TODO: Update to fetch bugs from DB
  const bugs = bugsData.map((bug, index) => {
    return <BugCard key={index} bug={bug} />;
  });

  useEffect(() => {
    dispatch(getBugs(), [bugs]);
  });

  return (
    <div className="viewbugs">
      <h1 className="viewbugs-title">View Bugs</h1>
      <div className="buglist">{bugs}</div>
    </div>
  );
};

export default ViewBugs;
