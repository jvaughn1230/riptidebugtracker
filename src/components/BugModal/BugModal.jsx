import React from "react";
import "./BugModal.css";
import Modal from "../Modal/Modal";

import UpdateBugForm from "../UpdateBugForm/UpdateBugForm";

const BugModal = ({ closeModal, bug }) => {
  return (
    <Modal closeModal={closeModal} scroll={true}>
      <div className="bug-modal-body">
        <div className="bug-modal-header">
          <h4 className="bug-modal-title">Bug Details</h4>
        </div>
        <UpdateBugForm bug={bug} closeModal={closeModal} />
      </div>
    </Modal>
  );
};
export default BugModal;
