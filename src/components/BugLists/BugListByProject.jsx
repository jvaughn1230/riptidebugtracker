import React from "react";
import BugModalContainer from "../BugModal/BugModalContainer";
import { useFetchBugsByProjectQuery } from "../../redux/apis/bugsApiSlice";

const BugListByProject = ({ project }) => {
  const { data, error, isLoading } = useFetchBugsByProjectQuery(project);
  console.log(data && data);
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="bugcards-container">
          {data?.map((bug) => (
            <BugModalContainer key={bug._id} bug={bug} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BugListByProject;
