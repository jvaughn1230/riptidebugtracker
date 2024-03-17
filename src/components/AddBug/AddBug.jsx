import React, { useState, useEffect, useRef, useMemo } from "react";
import "./AddBug.css";
import Modal from "../modal/Modal";
import { useAddBugMutation } from "../../redux/apis/bugsApiSlice";
import SelectProject from "../SelectProject/SelectProject";

// TODO: Cleanup Date function

const AddBug = ({ closeModal }) => {
  // Fetch Today's Date & Format
  const today = useMemo(() => new Date(), []);

  const month =
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : `${today.getMonth() + 1}`;

  const day =
    today.getDate() + 1 < 10 ? `0${today.getDate}` : `${today.getDate()}`;

  // New Bug Init State
  const [newBug, setNewBug] = useState({
    issue: "",
    recreate: "",
    priority: 2,
    project: null,
    due: `${today.getFullYear()}-${month}-${day}`,
  });

  const [addBug, { isLoading, isSuccess, isError, error }] =
    useAddBugMutation();

  const [errMsg, setErrMsg] = useState("");

  const errRef = useRef();
  const bugRef = useRef();

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
        recreate: "",
        priority: "Regular",
        due: `${today.getFullYear()}-${month}-${day}`,
        created: `${today.getFullYear()}-${month}-${day}`,
      });
    }
  }, [isSuccess, day, month, today]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewBug((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputTime = new Date(newBug.due);
    const timeZoneOffsetMninutes = inputTime.getTimezoneOffset();
    const utcTime = new Date(
      inputTime.getTime() + timeZoneOffsetMninutes * 60000
    );

    const { issue, recreate, priority, project } = newBug;

    try {
      await addBug({
        issue,
        recreate,
        priority,
        due: utcTime,
        project,
      }).unwrap();

      setNewBug({
        issue: "",
        recreate: "",
        priority: "Regular",
        due: `${today}`,
        project: null,
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
        <h2 className="addbug-header">Create Bug</h2>

        <p className={errClass}>{error?.data?.message}</p>

        <form className="addbug-form" id="bugform">
          <label>Issue: </label>
          <input
            type="input"
            name="issue"
            value={newBug.issue}
            required
            onChange={handleChange}
            ref={bugRef}
          />

          <label>Steps to Recreate: </label>
          <textarea
            name="recreate"
            value={newBug.recreate}
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
            <option value={2}>Regular</option>
            <option value={3}>High</option>
            <option value={1}>Low</option>
          </select>

          <label>Project: </label>
          <SelectProject value={newBug.project} handleChange={handleChange} />

          <label>Due By: </label>
          <input
            type="date"
            name="due"
            value={newBug.due}
            onChange={handleChange}
          />

          <button type="submit" onClick={handleSubmit}>
            Add Bug
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddBug;
