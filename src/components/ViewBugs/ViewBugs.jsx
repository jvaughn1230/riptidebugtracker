import React, { useEffect } from "react";
import "./ViewBugs.css";
import BugCard from "../BugCard/BugCard";
import { bugsData } from "../../tempbug";
import { useDispatch, useSelector } from "react-redux";
import { getBugs } from "../../redux/apis/bugsApi";

const ViewBugs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBugs(), [bugs]);
  });

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
