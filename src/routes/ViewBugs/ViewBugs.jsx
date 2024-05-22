import React, { useState } from "react";
import "./ViewBugs.css";
import BugList from "../../components/BugLists/BugList";
import BugListByProject from "../../components/BugLists/BugListByProject";

import { useFetchProjectsQuery } from "../../redux/apis/projectsApiSlice";

const ViewBugs = () => {
  const { data, error, isLoading } = useFetchProjectsQuery();
  const [selectedProject, setSelectedProject] = useState("");

  const handleChange = (e) => {
    const projectId = e.target.value;
    setSelectedProject(projectId);
  };

  return (
    <div className="view-bugs page">
      <div className="view-bugs-header">
        <h1 className="view-bugs-title">Open Bugs</h1>
        <div className="flex project-filter-container">
          <p>Filter By Project:</p>
          {/* Project Filter */}
          <select
            name="project"
            value={selectedProject}
            onChange={handleChange}
          >
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
        </div>
      </div>

      <div className="bug-list">
        {!selectedProject || selectedProject === "none" ? (
          <BugList />
        ) : (
          <BugListByProject project={selectedProject} />
        )}
      </div>
    </div>
  );
};

export default ViewBugs;
