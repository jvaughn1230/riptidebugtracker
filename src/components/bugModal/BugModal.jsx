import React, { useEffect, useState } from "react";
import "./bugModal.css";
import Modal from "../modal/Modal";
import {
  useDeleteBugMutation,
  useUpdateBugMutation,
} from "../../redux/apis/bugsApiSlice";
import { useFetchProjectsQuery } from "../../redux/apis/projectsApiSlice";
// TODO: Cleanup Date functions

// TODO: fix issue with empty projects. Receiving null, need a condition for null projects e.g., no project assigned

const BugModal = ({ closeModal, bug }) => {
  console.log(bug);

  const formattedDueDate = bug.due
    ? new Date(bug.due).toISOString().split("T")[0]
    : "";

  // const dueDate = new Date(bug.due);
  const updateDate = new Date(bug.updatedAt);
  const createdDate = new Date(bug.createdAt);

  // const formattedDueDate = new Intl.DateTimeFormat("en-US").format(dueDate);
  const formattedUpdateDate = new Intl.DateTimeFormat("en-US").format(
    updateDate
  );
  const formattedCreatedDate = new Intl.DateTimeFormat("en-US").format(
    createdDate
  );

  const [updateBugPriority, setUpdateBugPriority] = useState(bug.priority);
  const [updateBugUpdates, setUpdateBugUpdates] = useState(bug.updates);
  const [updateBugProject, setUpdateBugProject] = useState(bug.project);
  const [updateBugDueDate, setUpdateBugDueDate] = useState(formattedDueDate);
  // const [updateBugStatus, setUpdateBugStatus] = useState(bug.status);
  const [completed, setCompleted] = useState(bug.completed);

  console.log("state: ", updateBugDueDate);
  console.log(formattedDueDate);

  const [changed, setChanged] = useState(false);

  const {
    data,
    error: projectsError,
    isLoading: projectsLoading,
  } = useFetchProjectsQuery();

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

  const onCompletedChanged = (e) => setCompleted((prev) => !prev);

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
              {projectsError ? (
                <div class="errmsg">failed to load projects</div>
              ) : (
                <select
                  name="project"
                  value={updateBugProject}
                  onChange={(e) => {
                    setUpdateBugProject(e.target.value);
                    setChanged(true);
                  }}
                >
                  {projectsLoading ? (
                    <select disabled>Loading...</select>
                  ) : (
                    data?.map((project, index) => {
                      return (
                        <option
                          key={index}
                          value={project.name === null ? null : project.name}
                        >
                          {project.name === null
                            ? "No Project Assigned"
                            : project.name}
                        </option>
                      );
                    })
                  )}
                </select>
              )}
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
        {changed && (
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
