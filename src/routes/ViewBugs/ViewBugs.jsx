import React, { useEffect } from "react";
import "./ViewBugs.css";
import BugCard from "../../components/BugCard/BugCard";
import { useDispatch, useSelector } from "react-redux";
import { useFetchBugsQuery } from "../../redux/apis/bugsApiSlice";

const bugsData = ["bug1", "bug2"];
const ViewBugs = () => {
  const { data, error, isLoading } = useFetchBugsQuery();
  console.log("Bug Data: ");
  console.log(data);

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
