import React, { useState } from "react";
import "./bugcard.css";
import BugModal from "../bugModal/BugModal";
import plankton from "../../assets/plankton.png";

const BugCard = ({ bug }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(bug);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bugcard">
      <img src={plankton} alt="plankton" className="card-plankton" />
      <div className="card-row">
        <h3>Issue: </h3>
        <p>{bug.issue}</p>
      </div>
      <div className="card-row">
        {" "}
        <h3>Priority:</h3>
        <p>{bug.priority}</p>
      </div>
      <div className="card-row">
        {" "}
        <h3>Due:</h3>
        <p>{bug.due}</p>
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
