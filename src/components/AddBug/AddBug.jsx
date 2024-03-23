import React from "react";
import "./AddBug.css";
import Modal from "../modal/Modal";

import AddBugForm from "../AddBugForm/AddBugForm";
const AddBug = ({ closeModal }) => {
  return (
    <Modal closeModal={closeModal}>
      <div className="addbug-container">
        <h2 className="addbug-header">Create Bug</h2>
        <AddBugForm />
      </div>
    </Modal>
  );
};

export default AddBug;
