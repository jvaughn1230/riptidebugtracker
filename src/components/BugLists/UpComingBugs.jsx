import React from "react";
import BugModalContainer from "../BugModal/BugModalContainer";
import { useFetchUpcomingBugsQuery } from "../../redux/apis/bugsApiSlice";

const UpComingBugs = () => {
  const { data, error, isLoading } = useFetchUpcomingBugsQuery();

  return isLoading ? (
    <p>isLoading...</p>
  ) : error ? (
    <p>Error: {error.message}</p>
  ) : (
    <div className="bugcards-container">
      {data?.map((bug) => (
        <BugModalContainer key={`'upcoming'- ${bug._id}`} bug={bug} />
      ))}
    </div>
  );
};
export default UpComingBugs;
