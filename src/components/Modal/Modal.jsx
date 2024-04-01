import React from "react";
import plankton from "../../assets/plankton.png";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./Modal.css";

const Modal = ({ children, closeModal }) => {
  return (
    <div className="modal-bg">
      <div className="modal-container">
        <div className="modal-top">
          {/* <img src={plankton} alt="plankton" className="modal-plankton" /> */}
          <AiOutlineCloseCircle onClick={closeModal} className="close-modal" />
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
