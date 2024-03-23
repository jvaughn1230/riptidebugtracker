import React, { useEffect, useState } from "react";
import "./bugModal.css";
import Modal from "../modal/Modal";
import {
  useDeleteBugMutation,
  useUpdateBugMutation,
} from "../../redux/apis/bugsApiSlice";
import { toast } from "react-toastify";
import SelectProject from "../SelectProject/SelectProject";
import useDateFormatter from "../../hooks/useDateFormatter";

const BugModal = ({ closeModal, bug }) => {
  const { formatForDisplay, formatForBackend, formatForForm } =
    useDateFormatter();

  // Formatted Dates from Bug
  const formattedDueDate = bug.due ? formatForForm(bug.due) : "";
  const formattedUpdateDate = bug.updatedAt
    ? formatForDisplay(bug.updatedAt)
    : "";
  const formattedCreatedDate = formatForDisplay(bug.createdAt);

  // State
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

  const [deleteBug, { isSuccess: isDelSuccess }] = useDeleteBugMutation();

  const [updateBug, { isSuccess, isLoading, isError }] = useUpdateBugMutation();

  useEffect(() => {
    if (isDelSuccess || isSuccess) {
      closeModal();
    }
  }, [isDelSuccess, isSuccess, closeModal]);

  const onDeleteBugClicked = async () => {
    try {
      await deleteBug({ id: bug._id });
      toast.success("Deleted Bug!");
    } catch (err) {
      toast.error("Failed To Delete Bug. Please Try Again!");
    }
  };

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

    setDraftBug((prevDraftBug) => ({
      ...prevDraftBug,
      [name]: value,
    }));

    setUpdates((prevUpdates) => ({
      ...prevUpdates,
      [name]: value,
    }));

    setChanged(true);
  };

  const onUpdateBugClicked = async (e) => {
    e.preventDefault();

    if (updates.due) {
      formatForBackend(updates.due);
    }

    try {
      await updateBug(updates);
      toast.success("Bug Updated!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="bug-modal-body">
        <div className="bug-modal-header">
          <h4 className="bugmodal-title">Bug Details</h4>
        </div>

        {/* Basic Info */}
        <div className="bug-modal-content">
          <div className="bug-section">
            <h3 className="bug-section-header">Basic Information</h3>
            <div className="bug-section-content">
              <div className="bug-info">
                <p>
                  <span>Issue:</span> {bug.issue}
                </p>
                <p>Status: {bug.status}</p>
                <p>Created: {formattedCreatedDate}</p>
                <p>Last Updated: {formattedUpdateDate}</p>
              </div>
            </div>
          </div>

          {/* Updatable Fields */}
          <div className="bug-section">
            <h3 className="bug-section-header">Project</h3>
            <div className="bug-section-content">
              <SelectProject
                value={bug.project}
                onChange={(e) =>
                  setDraftBug({ ...draftBug, project: e.target.value })
                }
              />
            </div>
          </div>

          <div className="bug-section">
            <h5 className="bug-section-header">Due Date</h5>
            <div className="bug-section-content">
              <input
                type="date"
                value={draftBug.due}
                onChange={(e) =>
                  setDraftBug({ ...draftBug, due: e.target.value })
                }
              />
            </div>
          </div>

          <div className="bug-section">
            <h5 className="bug-section-header">Updates</h5>
            <div className="bug-section-content">
              <textarea
                value={draftBug.updates}
                className="bug-updates"
                onChange={(e) =>
                  setDraftBug({ ...draftBug, updates: e.target.value })
                }
              ></textarea>
            </div>
          </div>

          <div className="bug-modal-footer">
            <button
              className="update-bug-btn"
              onClick={onUpdateBugClicked}
              disabled={isLoading}
            >
              Update Bug
            </button>
            <button>Cancel</button>
            <button className="delete-bug-btn" onClick={onDeleteBugClicked}>
              Delete Bug
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default BugModal;
