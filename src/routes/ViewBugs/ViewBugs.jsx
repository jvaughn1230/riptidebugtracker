import React from "react";
import "./ViewBugs.css";
import BugCard from "../../components/BugCard/BugCard";
import { useFetchBugsQuery } from "../../redux/apis/bugsApiSlice";

const ViewBugs = () => {
  const { data, error, isLoading } = useFetchBugsQuery();

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="viewbugs">
      <h1 className="viewbugs-title">View Bugs</h1>
      <div className="buglist">
        {data?.map((bug, index) => {
          return <BugCard key={index} bug={bug} />;
        })}
      </div>
    </div>
  );
};

export default ViewBugs;
