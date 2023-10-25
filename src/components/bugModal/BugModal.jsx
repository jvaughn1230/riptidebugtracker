import React, { useEffect, useState } from "react";
import "./bugModal.css";
import Modal from "../modal/Modal";
import {
  useDeleteBugMutation,
  useUpdateBugMutation,
} from "../../redux/apis/bugsApiSlice";
import { useFetchProjectsQuery } from "../../redux/apis/projectsApiSlice";

const BugModal = ({ closeModal, bug }) => {
  console.log(bug);
  const formattedUpdateDate = bug.updatedAt
    ? new Date(bug.updatedAt).toLocaleDateString("en-US")
    : "";

  const formattedCreatedDate = bug.createdAt
    ? new Date(bug.createdAt).toLocaleDateString("en-US")
    : "";

  const formattedDueDate = bug.due
    ? new Date(bug.due).toISOString().split("T")[0]
    : "";

  const [updateBugPriority, setUpdateBugPriority] = useState(bug.priority);
  const [updateBugUpdates, setUpdateBugUpdates] = useState(bug.updates);
  const [updateBugProject, setUpdateBugProject] = useState(bug.project.name);
  const [updateBugDueDate, setUpdateBugDueDate] = useState(formattedDueDate);
  // const [updateBugStatus, setUpdateBugStatus] = useState(bug.status);
  const [completed, setCompleted] = useState(bug.completed);

  const [changed, setChanged] = useState(false);

  const {
    data,
    error: projectsError,
    isLoading: projectsLoading,
  } = useFetchProjectsQuery();

  const [
    deleteBug,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteBugMutation();

  const [updateBug, { isSuccess, isLoading, isError, error }] =
    useUpdateBugMutation();

  useEffect(() => {
    if (isDelSuccess || isSuccess) {
      closeModal();
    }
  }, [isDelSuccess, isSuccess]);

  const onDeleteBugClicked = async () => {
    await deleteBug({ id: bug._id });
  };

  const onCompletedChanged = (e) => setCompleted((prev) => !prev);

  // const canSave = [title, text, userId].every(Boolean) && !isLoading

  const handleDueDateChange = (e) => {
    // value={editedBugData.dueDate.toISOString().split('T')[0]}
    const newDueDate = e.target.value;
    setUpdateBugDueDate(newDueDate);
    setChanged(true);
  };

  const onUpdateBugClicked = async (e) => {
    e.preventDefault();

    const inputTime = new Date(updateBugDueDate);
    const timeZoneOffsetMninutes = inputTime.getTimezoneOffset();
    const utcTime = new Date(
      inputTime.getTime() + timeZoneOffsetMninutes * 60000
    );

    try {
      await updateBug({
        id: bug._id,
        priority: updateBugPriority,
        due: utcTime,
        updates: updateBugUpdates,
        completed: completed,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // const formattedDueDate = editedBugData.dueDate.toISOString();

  return (
    <Modal closeModal={closeModal}>
      {/* Modal Header */}
      <h4 className="bugmodal-title">Alert #{bug._id}</h4>
      {/* Modal Body */}
      <div className="bugmodal-body">
        {isDelError ? <div>Failed to delete Bug please try again</div> : null}
        {isError ? <div>Failed to update Bug. Please try again</div> : null}

        {/* Modal Details Section */}
        <div className="bugmodal__section">
          <h5 className="bugmodal__section-header">Details: </h5>
          <div className="bugmodal__row">
            <div className="bugmodal__container">
              <label className="bugmodal__text">Project:</label>
              <select
                name="project"
                value={updateBugProject}
                onChange={(e) => {
                  setUpdateBugProject(e.target.value);
                  setChanged(true);
                }}
              >
                {data?.map((project, index) => {
                  return (
                    <option key={index} value={project.name}>
                      {project.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="bugmodal__container">
              <label>Priority: </label>
              <select
                name="priority"
                value={updateBugPriority}
                onChange={(e) => {
                  setUpdateBugPriority(e.target.value);
                  setChanged(true);
                }}
              >
                <option value={2}>Regular</option>
                <option value={3}>High</option>
                <option value={1}>Low</option>
              </select>
            </div>

            <div className="bugmodal__container">
              <label>Mark Complete</label>
              <input
                type="checkbox"
                checked={completed}
                onChange={() => {
                  onCompletedChanged();
                  setChanged(true);
                }}
              />
            </div>
          </div>
          <div className="bugmodal__container">
            <p>Issue: </p>
            <p>{bug.issue}</p>
          </div>
          <div className="bugmodal__container">
            <p>Steps to Recreate: </p>
            <p>{bug.recreate}</p>
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
                  value={updateBugDueDate}
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
              value={updateBugUpdates}
              className="updates-input"
              onChange={(e) => {
                setUpdateBugUpdates(e.target.value);
                setChanged(true);
              }}
            ></textarea>
          </div>
        </div>

        {/* Modal Buttons */}
        {changed ? (
          <div className="bugmodal-buttons">
            <button
              onClick={(e) => {
                setUpdateBugUpdates(bug.updates);
                setUpdateBugPriority(bug.priority);
                setCompleted(bug.completed);
                setChanged(false);
              }}
            >
              cancel
            </button>
            <button onClick={onUpdateBugClicked}>Update</button>
          </div>
        ) : null}
      </div>
      <div>
        <button onClick={onDeleteBugClicked}>Delete</button>
      </div>
    </Modal>
  );
};

export default BugModal;
