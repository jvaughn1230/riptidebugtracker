import React, { useEffect, useState } from "react";
import "./bugModal.css";
import Modal from "../modal/Modal";
import {
  useDeleteBugMutation,
  useUpdateBugMutation,
} from "../../redux/apis/bugsApiSlice";

const BugModal = ({ closeModal, bug }) => {
  const initBug = bug;

  const [updateBugPriority, setUpdateBugPriority] = useState(bug.priority);
  const [updateBugUpdates, setUpdateBugUpdates] = useState(bug.updates);
  // const [updateBugStatus, setUpdateBugStatus] = useState(bug.status);
  const [completed, setCompleted] = useState(bug.completed);

  const [changed, setChanged] = useState(false);

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

  const onUpdateBugClicked = async (e) =>
    await updateBug({
      id: bug._id,
      priority: updateBugPriority,
      updates: updateBugUpdates,
      completed: completed,
    });

  return (
    <Modal closeModal={closeModal}>
      <h1 className="bugmodal-title">{bug.issue}</h1>
      <div className="bugmodal-body">
        {isDelError ? <div>Failed to delete Bug please try again</div> : null}
        {isError ? <div>Failed to update Bug. Please try again</div> : null}
        <div className="flex-row budmodal-row">
          <p>Last Updated: {bug.updatedAt}</p>
          <p>Created: {bug.createdAt.slice(0, 10)}</p>
        </div>
        <p>Steps to Recreate: {bug.recreate}</p>
        <label>Updates: </label>
        <input
          type="text"
          value={updateBugUpdates}
          onChange={(e) => {
            setUpdateBugUpdates(e.target.value);
            setChanged(true);
          }}
        ></input>

        <label>Priority: </label>
        <select
          name="priority"
          value={updateBugPriority}
          onChange={(e) => {
            setUpdateBugPriority(e.target.value);
            setChanged(true);
          }}
        >
          <option value="Regular">Regular</option>
          <option value="High">High</option>
          <option value="Low">Low</option>
        </select>

        <label>Mark Complete</label>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => {
            onCompletedChanged();
            setChanged(true);
          }}
        />
        {changed ? (
          <>
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
          </>
        ) : null}
      </div>
      <div>
        <button onClick={onDeleteBugClicked}>Delete</button>
      </div>
    </Modal>
  );
};

export default BugModal;
