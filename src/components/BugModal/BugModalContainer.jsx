import React, { useState } from "react";
import BugModal from "./BugModal";
import BugCard from "../BugCard/BugCard";

const BugModalContainer = ({ bug }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <BugCard bug={bug} openModal={openModal} />
      {isModalOpen && <BugModal closeModal={closeModal} bug={bug} />}
    </>
  );
};

export default BugModalContainer;
