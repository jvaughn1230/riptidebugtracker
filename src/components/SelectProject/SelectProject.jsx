import React from "react";
import { useFetchProjectsQuery } from "../../redux/apis/projectsApiSlice";

const SelectProject = ({ value, handleChange }) => {
  const {
    data,
    error: projectsError,
    isLoading: projectsLoading,
  } = useFetchProjectsQuery();

  return (
    <select name="project" value={value} onChange={handleChange}>
      <option value="none">Select Project</option>
      {projectsError ? (
        <div>Failed to Load Projects</div>
      ) : projectsLoading ? (
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
