import React from "react";
import "./bugModal.css";
import Modal from "../modal/Modal";

const BugModal = ({ closeModal }) => {
  return (
    <Modal closeModal={closeModal}>
      <h1>bug #bugid</h1>
      <div>
        <div>Date Created</div>
        <div>Priority</div>
        <div>Due Date</div>
      </div>
      <div>Name</div>
      <div>Details</div>
      <div>Updates</div>
      <div>Status</div>
      <div>Update BUtton</div>
    </Modal>
  );
};

export default BugModal;
