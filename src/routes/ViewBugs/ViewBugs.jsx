import React from "react";
import "./ViewBugs.css";
import { useFetchBugsQuery } from "../../redux/apis/bugsApiSlice";
import BugModalContainer from "../../components/BugModalContainer";

const ViewBugs = () => {
  const { data, error, isLoading } = useFetchBugsQuery();

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="view-bugs">
      <h1 className="view-bugs-title">View Bugs</h1>
      <div className="bug-list">
        {data?.map((bug) => {
          return <BugModalContainer key={bug._id} bug={bug} />;
        })}
      </div>
    </div>
  );
};

export default ViewBugs;
