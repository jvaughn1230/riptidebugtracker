import React from "react";
import "./bugModal.css";
import Modal from "../modal/Modal";

import UpdateBugForm from "../UpdateBugForm/UpdateBugForm";

const BugModal = ({ closeModal, bug }) => {
  return (
    <Modal closeModal={closeModal}>
      <div className="bug-modal-body">
        <div className="bug-modal-header">
          <h4 className="bugmodal-title">Bug Details</h4>
        </div>
        <h5>Updadte Form</h5>
        <UpdateBugForm bug={bug} closeModal={closeModal} />
      </div>
    </Modal>
  );
};
export default BugModal;
