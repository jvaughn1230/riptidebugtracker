import React, { useState } from "react";
import "./bugcard.css";
import BugModal from "../bugModal/BugModal";

const BugCard = (bug) => {
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

      <button onClick={openModal}>View Bug</button>
      {isModalOpen && <BugModal closeModal={closeModal} />}
    </div>
  );
};

export default BugCard;
