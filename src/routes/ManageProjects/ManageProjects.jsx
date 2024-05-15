import React from "react";
import "./ManageProjects.css";

import NewBugCard from "../../components/newBugCard";

import ProjectCard from "../../components/ProjectCard/ProjectCard";

import { useFetchProjectsQuery } from "../../redux/apis/projectsApiSlice";

const ManageProjects = () => {
  const { data, error, isLoading } = useFetchProjectsQuery();

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="manage-projects">
      {error ? <div>There was an error, please try again</div> : null}
      <h1 className="manage-projects-title">Manage Projects</h1>
      <NewBugCard />
      <div className="projects-container">
        {data?.map((project, index) => {
          return <ProjectCard key={index} project={project} />;
        })}
      </div>
    </div>
  );
};
export default ManageProjects;
