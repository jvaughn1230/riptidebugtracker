import React from "react";
import plankton from "../../assets/plankton.png";
import "./modal.css";

const Modal = ({ children, closeModal }) => {
  return (
    <div className="modal-bg">
      <div className="modal-container">
        <div className="modal-top">
          <img src={plankton} alt="plankton" className="modal-plankton" />
          <button onClick={closeModal}>Close</button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
