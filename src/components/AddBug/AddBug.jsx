import React from "react";
import "./AddBug.css";
import Modal from "../Modal/Modal";

import AddBugForm from "../AddBugForm/AddBugForm";
const AddBug = ({ closeModal }) => {
  return (
    <Modal closeModal={closeModal}>
      <div className="add-bug-container">
        <h2 className="add-bug-header">Create Bug</h2>
        <AddBugForm closeModal={closeModal} />
      </div>
    </Modal>
  );
};

export default AddBug;
