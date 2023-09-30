import React, { useEffect, useState } from "react";
import "./bugModal.css";
import Modal from "../modal/Modal";
import {
  useDeleteBugMutation,
  useUpdateBugMutation,
} from "../../redux/apis/bugsApiSlice";

const BugModal = ({ closeModal, bug }) => {
  const initBug = bug;
  console.log("Init Bug: ");
  console.log(initBug);

  const [updateBugPriority, setUpdateBugPriority] = useState(bug.priority);
  const [updateBugDetails, setUpdateBugDetails] = useState(bug.details);
  const [updateBugStatus, setUpdateBugStatus] = useState(bug.status);

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

  // const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onUpdateBugClicked = async (e) =>
    await updateBug({
      id: bug._id,
      priority: updateBugPriority,
      status: updateBugStatus,
      details: updateBugDetails,
    });

  return (
    <Modal closeModal={closeModal}>
      {bug.issue}
      <h1 className="bugmodal-title">bug #bugid</h1>
      <div className="bugmodal-body">
        {isDelError ? <div>Failed to delete Bug please try again</div> : null}
        {isError ? <div>Failed to update Bug. Please try again</div> : null}
        <div>
          <p>Priority: </p>
          <input
            type="text"
            value={updateBugPriority}
            onChange={(e) => {
              setUpdateBugPriority(e.target.value);
              setChanged(true);
            }}
          ></input>
          <div>Created: {bug.createdAt}</div>
        </div>
        <p>Issue: {bug.issue}</p>
        <p>details:</p>
        <input
          type="text"
          value={updateBugDetails}
          onChange={(e) => {
            setUpdateBugDetails(e.target.value);
            setChanged(true);
          }}
        ></input>
        <div>Updates</div>
        <p>Priority: </p>
        <input
          type="text"
          value={updateBugStatus}
          onChange={(e) => {
            setUpdateBugStatus(e.target.value);
            setChanged(true);
          }}
        ></input>
        {changed ? (
          <>
            <button
              onClick={(e) => {
                setUpdateBugDetails(bug.details);
                setUpdateBugPriority(bug.priority);
                setUpdateBugStatus(bug.status);
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
