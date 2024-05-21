import React from "react";
import { useFetchRecentBugsQuery } from "../redux/apis/bugsApiSlice";
import NewBugCard from "./newBugCard";

const RecentBugs = () => {
  const { data, error, isLoading } = useFetchRecentBugsQuery();

  return (
    <div className="bugcards-container">
      {data?.map((bug) => {
        return <NewBugCard key={bug._id} bug={bug} />;
      })}
    </div>
  );
};

export default RecentBugs;
