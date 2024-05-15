import React, { useState, useEffect } from "react";
import moment from "moment";
import "./SidePanel.css"; // Styles for the side panel

const SidePanel = ({ created, due, completed }) => {
  const [deadlineStatus, setDeadlineStatus] = useState("");

  useEffect(() => {
    calculateDeadlineStatus();
  }, [created, due, completed]);

  // Calculate the deadline status and set the state
  const calculateDeadlineStatus = () => {
    if (completed) {
      setDeadlineStatus("100%");
      return;
    }

    const createdDate = moment(created);
    const formattedDueDate = moment(due, "YYYY-MM-DD");
    const totalDays = formattedDueDate.diff(createdDate, "days");
    console.log("time to complete", totalDays);
    const daysElapsed = moment().diff(createdDate, "days");
    console.log("elapsed", daysElapsed);
    const percentage = (daysElapsed / totalDays) * 100;

    if (percentage >= 100) {
      setDeadlineStatus("100%");
    } else if (percentage <= 0) {
      setDeadlineStatus("0%");
    } else {
      setDeadlineStatus(`${percentage}%`);
    }
  };
  console.log(deadlineStatus);

  return <div className="color-bar" style={{ height: "100%" }}></div>;
};

export default SidePanel;
