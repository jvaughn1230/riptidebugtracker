import React from "react";
import { useFetchRecentBugsQuery } from "../../redux/apis/bugsApiSlice";
import BugModalContainer from "../BugModal/BugModalContainer";

const RecentBugs = () => {
  const { data, error, isLoading } = useFetchRecentBugsQuery();

  return isLoading ? (
    <p>isLoading...</p>
  ) : error ? (
    <p>Error: {error.message}</p>
  ) : (
    <div className="bugcards-container">
      {data?.map((bug) => (
        <BugModalContainer key={`'recent'- ${bug._id}`} bug={bug} />
      ))}
    </div>
  );
};

export default RecentBugs;
