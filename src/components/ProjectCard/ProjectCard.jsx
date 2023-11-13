import React, { useState, useEffect } from "react";
import "./ProjectCard.css";
import plankton from "../../assets/plankton.png";

import {
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} from "../../redux/apis/projectsApiSlice";

const ProjectCard = ({ project }) => {
  const [changed, setChanged] = useState(false);
  const [reqDelete, setReqDelete] = useState(false);
  const [updateName, setUpdateName] = useState(project.name);
  const [updateDescription, setUpdateDescription] = useState(
    project.description
  );
  const [updates, setUpdates] = useState({ id: project._id });

  const [deleteProject, { isSuccess: isDelSuccess, isError: isDelError }] =
    useDeleteProjectMutation();

  const [updateProject, { isSuccess: isUpdateSuccess, isLoading, isError }] =
    useUpdateProjectMutation();

  const onDeleteProjectClicked = async () => {
    await deleteProject({ id: project._id });
  };

  useEffect(() => {
    if (isDelSuccess) {
      setReqDelete(false);
    }
  }, [isDelSuccess]);

  const handleNameChange = (e) => {
    setChanged(true);
    setUpdateName(e.target.value);
    setUpdates((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleDescriptionChange = (e) => {
    setChanged(true);
    setUpdateDescription(e.target.value);
    setUpdates((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProject(updates);
      return setChanged(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="projectcard">
      <div className="projectcard__container">
        <h5 className="projectdcard__header">Project:</h5>
        <input
          className="projectdcard__body"
          type="text"
          name="name"
          value={updateName}
          onChange={handleNameChange}
        />
      </div>
      <div className="projectcard__container">
        <h5 className="projectdcard__header">Description</h5>
        <input
          className="projectdcard__body"
          name="description"
          value={updateDescription}
          onChange={handleDescriptionChange}
        />
      </div>
      <div>
        <button disabled={!changed} type="submit" onClick={handleSubmit}>
          Submit
        </button>
        <button onClick={() => setReqDelete(true)}>Delete</button>
      </div>
      <div className={`${reqDelete ? "reqDelete__container" : "hide"}`}>
        <div className="reqDelete__body">
          <span>Delete Project? </span>
          <div className="reqDelete__btns">
            <button onClick={onDeleteProjectClicked}>Confirm</button>
            <button onClick={() => setReqDelete(false)}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
