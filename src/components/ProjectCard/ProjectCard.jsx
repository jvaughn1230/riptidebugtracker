import React, { useState, useEffect } from "react";
import "./ProjectCard.css";
import { toast } from "react-toastify";

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

  const [deleteProject, { isSuccess: isDelSuccess }] =
    useDeleteProjectMutation();

  const [updateProject, { isLoading }] = useUpdateProjectMutation();

  const onDeleteProjectClicked = async () => {
    try {
      await deleteProject({ id: project._id });
      toast.success("Projected Deleted!");
    } catch (err) {
      toast.error("Failed to Delete. Please Try Again!");
    }
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
      toast.success("Project Updated!");
      return setChanged(false);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="projectcard">
      <div className="projectcard__container">
        <h5 className="projectcard__header">Project:</h5>
        <input
          className="projectcard__body"
          type="text"
          name="name"
          value={updateName}
          onChange={handleNameChange}
        />
      </div>
      <div className="projectcard__container">
        <h5 className="projectcard__header">Description: </h5>
        <input
          className="projectcard__body"
          name="description"
          value={updateDescription}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="projectcard__buttons">
        <button
          disabled={!changed || isLoading}
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button onClick={() => setReqDelete(true)}>Delete</button>
      </div>
      <div className={`${reqDelete ? "reqDelete__container" : "hide"}`}>
        <div className="reqDelete__body">
          <p className="reqDelete__header">Delete Project? </p>
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
