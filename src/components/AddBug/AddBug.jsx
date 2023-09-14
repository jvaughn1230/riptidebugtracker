import React, { useState } from "react";
import "./AddBug.css";
import Modal from "../modal/Modal";
import { useAddBugMutation } from "../../redux/apis/bugsApi";

const AddBug = ({ closeModal }) => {
  const [newBug, setNewBug] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewBug((values) => ({ ...values, [name]: value }));
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="addbug-container">
        {/* <img className="plankton-img " src={plankton} alt="plankton" /> */}
        <h2>Create Bug</h2>

        <form className="addbug-form" id="bugform">
          <label>Name: </label>
          <input
            type="input"
            name="name"
            value={newBug.name}
            required
            onChange={handleChange}
          />

          <label>Details: </label>
          <textarea
            name="details"
            value={newBug.details}
            onChange={handleChange}
            required
          />

          <label>Priority:</label>
          <select
            name="priority"
            value={newBug.priority}
            onChange={handleChange}
            required
          >
            <option value="2">Regular</option>
            <option value="1">High</option>
            <option value="3">Low</option>
          </select>

          <label>Assigned: </label>
          <select name="assigned" onChange={handleChange}>
            <option value="option1">Option1</option>
            <option value="option2">Option2</option>
          </select>

          <button type="submit">Add Bug</button>
        </form>
      </div>
    </Modal>
  );
};

export default AddBug;
