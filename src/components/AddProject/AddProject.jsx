import React, { useState, useEffect, useRef } from "react";
import "./AddProject.css";
import { useAddProjectMutation } from "../../redux/apis/projectsApiSlice";
import Modal from "../Modal/Modal";
import { toast } from "react-toastify";
import useErrorHandling from "../../hooks/useErrorHandling";

const AddProject = ({ closeModal }) => {
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
  });

  const { errMsg, handleErrors } = useErrorHandling();

  // TODO: Check if all needed
  const [addProject, { isLoading }] = useAddProjectMutation();

  const projectRef = useRef();

  useEffect(() => {
    projectRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewProject((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description } = newProject;

    // TODO: fix error messages
    try {
      await addProject({ name, description }).unwrap();
      setNewProject({
        name: "",
        description: "",
      });
      closeModal();
      toast.success("Project Added!");
    } catch (err) {
      handleErrors(err, "Failed to add Project");
    }
  };

  return isLoading ? (
    <h1>Loading ...</h1>
  ) : (
    <Modal closeModal={closeModal}>
      <form className="add-project-form">
        <h2 className="add-project-header">Add New Project</h2>
        {errMsg ? <div className="errmsg">{errMsg}</div> : null}
        <div className="add-project-form-row">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newProject.name}
            ref={projectRef}
            onChange={handleChange}
            required
          />
        </div>

        <div className="add-project-form-row">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={newProject.description}
            onChange={handleChange}
          />
        </div>

        <button onClick={handleSubmit} className="add-project-button">
          Add
        </button>
      </form>
    </Modal>
  );
};

export default AddProject;
