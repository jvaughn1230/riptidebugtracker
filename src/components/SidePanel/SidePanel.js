import React, { useState, useEffect } from "react";
import moment from "moment";
import "./SidePanel.css"; // Styles for the side panel

const SidePanel = ({ created, due, completed }) => {
  const [deadlineStatus, setDeadlineStatus] = useState("");

  useEffect(() => {
    calculateDeadlineStatus();
  }, [created, due, completed]);

  const calculateDeadlineStatus = () => {
    if (completed) {
      setDeadlineStatus("100%");
    } else {
      const createdDate = moment(created);
      const formattedDueDate = moment(due, "YYYY-MM-DD");
      const totalDays = formattedDueDate.diff(createdDate, "days");
      const daysElapsed = moment().diff(createdDate, "days");
      const percentage = (daysElapsed / totalDays) * 100;

      if (percentage >= 100) {
        setDeadlineStatus("100%");
      } else if (percentage <= 0 || isNaN) {
        setDeadlineStatus("5%");
      } else {
        setDeadlineStatus(`${percentage}%`);
      }
    }
  };

  return <div className="color-bar" style={{ height: deadlineStatus }}></div>;
};

export default SidePanel;
