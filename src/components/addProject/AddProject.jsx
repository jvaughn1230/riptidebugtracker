import React, { useState, useEffect, useRef } from "react";
import { useAddProjectMutation } from "../../redux/apis/projectsApiSlice";
import Modal from "../modal/Modal";

const AddProject = ({ closeModal }) => {
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
  });

  const [errMsg, setErrMsg] = useState("");

  const [addProject, { isLoading, isSuccess, isError, error }] =
    useAddProjectMutation();

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

    try {
      await addProject({ name, description }).unwrap();
      setNewProject({
        name: "",
        description: "",
      });
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Name is required");
      } else {
        setErrMsg("Failed to add Project");
      }
    }

    closeModal();
  };

  return isLoading ? (
    <h1>Loading ...</h1>
  ) : (
    <Modal closeModal={closeModal}>
      <form>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={newProject.name}
          ref={projectRef}
          onChange={handleChange}
          required
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={newProject.description}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Add</button>
      </form>
    </Modal>
  );
};

export default AddProject;
