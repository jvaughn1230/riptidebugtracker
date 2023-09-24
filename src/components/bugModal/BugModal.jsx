import React from "react";
import "./bugModal.css";
import Modal from "../modal/Modal";

const BugModal = ({ closeModal, bug }) => {
  return (
    <Modal closeModal={closeModal}>
      {bug.issue}
      <h1 className="bugmodal-title">bug #bugid</h1>
      <div className="bugmodal-body">
        <div>
          <div>Date Created</div>
          <div>{bug.priority}</div>
          <div>{bug.createdAt}</div>
        </div>
        <div>{bug.issue}</div>
        <div>{bug.details}</div>
        <div>Updates</div>
        <div>{bug.status}</div>
        <div>Update Button</div>
      </div>
    </Modal>
  );
};

export default BugModal;
