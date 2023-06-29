import React from "react";
import "./bugModal.css";
import Modal from "../modal/Modal";

const BugModal = ({ closeModal }) => {
  return (
    <Modal closeModal={closeModal}>
      <h1 className="bugmodal-title">bug #bugid</h1>
      <div className="bugmodal-body">
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
      </div>
    </Modal>
  );
};

export default BugModal;
