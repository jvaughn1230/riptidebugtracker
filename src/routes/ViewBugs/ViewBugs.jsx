import React from "react";
import "./ViewBugs.css";
import { useFetchBugsQuery } from "../../redux/apis/bugsApiSlice";
import BugModalContainer from "../../components/BugModalContainer";

const ViewBugs = () => {
  const { data, error, isLoading } = useFetchBugsQuery();

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="viewbugs">
      <h1 className="viewbugs-title">View Bugs</h1>
      <div className="buglist">
        {data?.map((bug) => {
          return <BugModalContainer key={bug.id} bug={bug} />;
        })}
      </div>
    </div>
  );
};

export default ViewBugs;
