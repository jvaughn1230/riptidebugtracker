import React from "react";
import NewBugCard from "./newBugCard";
import { useFetchUpcomingBugsQuery } from "../redux/apis/bugsApiSlice";

const UpComingBugs = () => {
  const { data, error, isLoading } = useFetchUpcomingBugsQuery();

  return (
    <div className="bugcards-container">
      {data?.map((bug) => {
        return <NewBugCard key={bug._id} bug={bug} />;
      })}
    </div>
  );
};

export default UpComingBugs;
