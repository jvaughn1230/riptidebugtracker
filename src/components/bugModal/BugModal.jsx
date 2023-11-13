import React, { useEffect, useState } from "react";
import "./bugModal.css";
import Modal from "../modal/Modal";
import {
  useDeleteBugMutation,
  useUpdateBugMutation,
} from "../../redux/apis/bugsApiSlice";
import SelectProject from "../SelectProject/SelectProject";

const BugModal = ({ closeModal, bug }) => {
  const formattedDueDate = bug.due
    ? new Date(bug.due).toISOString().split("T")[0]
    : "";

  const updateDate = new Date(bug.updatedAt);
  const createdDate = new Date(bug.createdAt);

  const formattedUpdateDate = new Intl.DateTimeFormat("en-US").format(
    updateDate
  );
  const formattedCreatedDate = new Intl.DateTimeFormat("en-US").format(
    createdDate
  );

  const [draftBug, setDraftBug] = useState({
    priority: bug.priority,
    updates: bug.updates,
    project: bug.project ? bug.project._id : "none",
    due: formattedDueDate,
    status: bug.status,
    completed: bug.completed,
  });

  const [changed, setChanged] = useState(false);
  const [updates, setUpdates] = useState({ id: bug._id });

  const [deleteBug, { isSuccess: isDelSuccess, isError: isDelError }] =
    useDeleteBugMutation();

  const [updateBug, { isSuccess, isLoading, isError }] = useUpdateBugMutation();

  useEffect(() => {
    if (isDelSuccess || isSuccess) {
      closeModal();
    }
  }, [isDelSuccess, isSuccess, closeModal]);

  const onDeleteBugClicked = async () => {
    await deleteBug({ id: bug._id });
  };

  // const onCompletedChanged = (e) => setCompleted((prev) => !prev);

  const handleDueDateChange = (e) => {
    const newDueDate = e.target.value;
    setDraftBug({
      ...draftBug,
      due: newDueDate,
    });
    setChanged(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDraftBug((prev) => ({
      ...prev,
      [name]: value,
    }));

    setUpdates((prev) => ({
      ...prev,
      [name]: value,
    }));

    setChanged(true);
  };

  const onUpdateBugClicked = async (e) => {
    e.preventDefault();

    if (updates.due) {
      const inputTime = new Date(draftBug.due);
      const timeZoneOffsetMninutes = inputTime.getTimezoneOffset();
      const utcTime = new Date(
        inputTime.getTime() + timeZoneOffsetMninutes * 60000
      );
    }

    try {
      await updateBug(updates);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal closeModal={closeModal}>
      {/* Modal Header */}
      <h4 className="bugmodal-title">Alert #{bug._id}</h4>

      {/* Modal Body */}
      <div className="bugmodal-body">
        {isDelError && (
          <div className="errmsg">Failed to delete Bug please try again</div>
        )}
        {isError && (
          <div className="errmsg">Failed to update Bug. Please try again</div>
        )}

        {/* Modal Details Section */}
        <div className="bugmodal__section">
          <h5 className="bugmodal__section-header">Details: </h5>
          <div className="bugmodal__row">
            <div className="bugmodal__container">
              <label className="bugmodal__text">Project:</label>
              <SelectProject value={draftBug.project} onChange={handleChange} />
            </div>

            <div className="bugmodal__container">
              <label>Priority: </label>
              <select
                name="priority"
                value={draftBug.priority}
                onChange={handleChange}
              >
                <option value={2}>Regular</option>
                <option value={3}>High</option>
                <option value={1}>Low</option>
              </select>
            </div>

            <div className="bugmodal__container">
              <label>status:</label>
              <select
                name="status"
                value={draftBug.status}
                onChange={handleChange}
              >
                <option value={1}>Open</option>
                <option value={2}>In Progress</option>
                <option value={3}>Complete</option>
              </select>
            </div>
          </div>
          <div className="bugmodal__row">
            <label className="display-label">Issue: </label>
            <div className="display-inputs">{bug.issue}</div>
          </div>
          <div className="bugmodal__row">
            <label className="display-label">To Recreate: </label>
            <div className="display-inputs">{bug.recreate}</div>
          </div>
        </div>

        {/* Modal Dates Section */}
        <div className="bugmodal__section">
          <div className="bugmodal__section-header">Dates:</div>
          <div className="bugmodal__row">
            <div className="bugmodal__column">
              <div className="bugmodal__container">
                <p>Created: </p>
                <p>{formattedCreatedDate}</p>
              </div>
              <div className="bugmodal__container">
                <label>Due Date: </label>
                <input
                  type="date"
                  name="due"
                  value={draftBug.due}
                  onChange={handleDueDateChange}
                />
              </div>
            </div>
            <div className="bugmodal__colum">
              <div className="bugmodal__container">
                <p>Last Updated: </p>
                <p>{formattedUpdateDate}</p>
              </div>
              <div className="bugmodal__container">
                <p>Completed: </p>
                <p>{bug.completedAt}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Notes Section */}
        <div className="bugmodal__section">
          <div className="bugmodal__row">
            <label className="bugmodal__section-header">Updates: </label>
            <textarea
              type="text"
              value={draftBug.updates}
              name="updates"
              className="updates-input"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        {/* Modal Buttons */}
        {changed && (
          <div className="bugmodal-buttons">
            <button
              onClick={(e) => {
                setDraftBug({
                  priority: bug.priority,
                  updates: bug.updates,
                  project: bug.project ? bug.project._id : "none",
                  due: formattedDueDate,
                  status: bug.status,
                  completed: bug.completed,
                });
              }}
            >
              cancel
            </button>
            <button onClick={onUpdateBugClicked}>
              {isLoading ? "Updating" : "Update"}
            </button>
          </div>
        )}
      </div>
      <div>
        <button onClick={onDeleteBugClicked}>Delete</button>
      </div>
    </Modal>
  );
};

export default BugModal;
