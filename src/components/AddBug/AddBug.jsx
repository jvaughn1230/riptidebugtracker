import React, { useState, useEffect, useRef } from "react";
import "./AddBug.css";
import Modal from "../modal/Modal";
import { useAddBugMutation } from "../../redux/apis/bugsApiSlice";
import { useDispatch } from "react-redux";

const AddBug = ({ closeModal }) => {
  const [newBug, setNewBug] = useState({
    issue: "",
    details: "",
    priority: "2",
  });

  const [addBug, { isLoading, isSuccess, isError, error }] =
    useAddBugMutation();

  const [errMsg, setErrMsg] = useState("");

  const errRef = useRef();
  const bugRef = useRef();
  const dispatch = useDispatch();

  const errClass = isError ? "errMsg" : "offscreen";

  useEffect(() => {
    bugRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [newBug.issue, newBug.details]);

  useEffect(() => {
    if (isSuccess) {
      setNewBug({
        issue: "",
        details: "",
        priority: "2",
      });
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewBug((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { issue, details, priority } = newBug;

    try {
      const bugData = await addBug({ issue, details, priority }).unwrap();
      setNewBug({
        issue: "",
        details: "",
        priority: "2",
      });
      closeModal();
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Issues and Details are required fields");
      } else {
        setErrMsg("Failed to add Bug");
      }
      // errRef.current.focus();
    }
  };

  return isLoading ? (
    <h1>Loading ...</h1>
  ) : (
    <Modal closeModal={closeModal}>
      <div className="addbug-container">
        <h2>Create Bug</h2>

        <p className={errClass}>{error?.data?.message}</p>

        <form className="addbug-form" id="bugform">
          <label>Name: </label>
          <input
            type="input"
            name="issue"
            value={newBug.issue}
            required
            onChange={handleChange}
            ref={bugRef}
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

          <button type="submit" onClick={handleSubmit}>
            Add Bug
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddBug;
