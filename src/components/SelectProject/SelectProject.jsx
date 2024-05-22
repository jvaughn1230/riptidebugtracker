import React, { useState } from "react";
import { useFetchProjectsQuery } from "../../redux/apis/projectsApiSlice";

const SelectProject = ({ onProjectSelect }) => {
  const { data, error, isLoading } = useFetchProjectsQuery();

  const [selectedProject, setSelectedProject] = useState("");

  const handleChange = (e) => {
    const projectId = e.target.value;
    setSelectedProject(projectId);
    onProjectSelect(projectId);
  };

  return (
    <select name="project" value={selectedProject} onChange={handleChange}>
      <option value="none">Select Project</option>
      {error ? (
        <div>Failed to Load Projects</div>
      ) : isLoading ? (
        <option disabled>Loading . . .</option>
      ) : (
        data?.map((project, index) => {
          return (
            <option key={index} value={project._id}>
              {project.name}
            </option>
          );
        })
      )}
    </select>
  );
};

export default SelectProject;
