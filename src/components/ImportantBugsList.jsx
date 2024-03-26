import React, { useState, useEffect } from "react";
import { useFetchBugsQuery } from "../redux/apis/bugsApiSlice";
import BugModalContainer from "./BugModalContainer";

const ImportantBugsList = () => {
  const [highPriorityBugs, setHighPriorityBugs] = useState([]);
  const { data: bugs, error, isLoading } = useFetchBugsQuery();

  useEffect(() => {
    if (bugs) setHighPriorityBugs(bugs?.filter((bug) => bug.priority === 3));
  }, [bugs]);

  return (
    <>
      {error && <h3>Failed to Fetch Bugs. Please Try Again</h3>}
      {highPriorityBugs?.length === 0 && <h3>No High Priority Bugs Open</h3>}
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        highPriorityBugs?.map((bug) => {
          return <BugModalContainer bug={bug} key={bug._id} />;
        })
      )}
    </>
  );
};

export default ImportantBugsList;
