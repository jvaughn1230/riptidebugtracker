import React, { useEffect, useState } from "react";
import "./bugModal.css";
import Modal from "../modal/Modal";
import {
  useDeleteBugMutation,
  useUpdateBugMutation,
} from "../../redux/apis/bugsApiSlice";
import { useFetchProjectsQuery } from "../../redux/apis/projectsApiSlice";

const BugModal = ({ closeModal, bug }) => {
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

    console.log("received time: ", updateBugDueDate);

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
      <h1 className="bugmodal-title">{bug.issue}</h1>

      <div className="bugmodal-body">
        {isDelError ? <div>Failed to delete Bug please try again</div> : null}
        {isError ? <div>Failed to update Bug. Please try again</div> : null}
        <div className="flex-row budmodal-row1">
          <p>Last Updated: {formattedUpdateDate}</p>
          <p>Created: {formattedCreatedDate}</p>
        </div>

        <div className="bugmodal-row2">
          <div>
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
          <label>Due Date: </label>
          <input
            type="date"
            value={updateBugDueDate}
            onChange={handleDueDateChange}
          />
          <div>
            <label>Project</label>
            <select
              name="priority"
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
        </div>

        <div className="bugmodal-row3">
          <label>Steps to Recreate: </label>
          <input
            type="text"
            value={bug.recreate}
            className="recreate-bug"
            disabled
          ></input>
        </div>

        <div className="bugmodal-row4">
          <label>Updates: </label>
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

        <div>
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
