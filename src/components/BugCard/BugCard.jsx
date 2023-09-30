import React, { useState } from "react";
import "./bugcard.css";
import BugModal from "../bugModal/BugModal";

const BugCard = ({ bug }) => {
  // TODO: Need to have something that checks for changes and then have a update bug button to update bug
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bugcard">
      <h2 className="bugcard-title">{bug.issue}</h2>
      <div className="card-row">
        <h3>Details:</h3>
        <p>{bug.details}</p>
      </div>
      <div className="card-row">
        {" "}
        <h3>Priority:</h3>
        <p>{bug.priority}</p>
      </div>
      <div className="card-row">
        {" "}
        <h3>Status:</h3>
        <p>{bug.status}</p>
      </div>
      {/* <div className="card-row">
        <h3>Due Date:</h3>
        <p>Due Date Here</p>
      </div> */}

      <button onClick={openModal}>View Bug</button>
      {isModalOpen && <BugModal closeModal={closeModal} bug={bug} />}
    </div>
  );
};

export default BugCard;
