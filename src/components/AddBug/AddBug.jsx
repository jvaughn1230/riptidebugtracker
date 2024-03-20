import React, { useState, useEffect, useRef } from "react";
import "./AddBug.css";
import Modal from "../modal/Modal";
import { useAddBugMutation } from "../../redux/apis/bugsApiSlice";
import SelectProject from "../SelectProject/SelectProject";
import { toast } from "react-toastify";
import useErrorHandling from "../../hooks/useErrorHandling";
import useTodayDate from "../../hooks/useTodayDate";
import useDateFormatter from "../../hooks/useDateFormatter";

const AddBug = ({ closeModal }) => {
  const today = useTodayDate();
  const { formatForBackend } = useDateFormatter();

  const [newBug, setNewBug] = useState({
    issue: "",
    recreate: "",
    priority: 2,
    project: null,
    due: today,
  });

  const [addBug, { isLoading, isSuccess }] = useAddBugMutation();

  const { handleErrors } = useErrorHandling();
  const bugRef = useRef();

  useEffect(() => {
    bugRef.current.focus();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setNewBug({
        issue: "",
        recreate: "",
        priority: "Regular",
        due: today,
        created: today,
      });
    }
  }, [isSuccess, today]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewBug((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { issue, recreate, priority, project } = newBug;

    const formattedDue = formatForBackend(newBug.due);

    try {
      await addBug({
        issue,
        recreate,
        priority,
        due: formattedDue,
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
      toast.success("Bug Added!");
    } catch (err) {
      handleErrors(err, "bug");
    }
  };

  return isLoading ? (
    <h1>Loading ...</h1>
  ) : (
    <Modal closeModal={closeModal}>
      <div className="addbug-container">
        <h2 className="addbug-header">Create Bug</h2>

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
