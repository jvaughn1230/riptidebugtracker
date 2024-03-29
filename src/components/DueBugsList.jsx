import React, { useState, useEffect } from "react";
import { useFetchBugsQuery } from "../redux/apis/bugsApiSlice";
import BugModalContainer from "./BugModalContainer";

const DueBugsList = () => {
  const [dueBugs, setDueBugs] = useState([]);

  const { data: bugs, error, isLoading } = useFetchBugsQuery();

  const isDueToday = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);

    const formattedToday = new Intl.DateTimeFormat("en-US").format(today);

    const formattedDue = new Intl.DateTimeFormat("en-US").format(due);

    return formattedDue === formattedToday;
  };

  useEffect(() => {
    if (bugs) setDueBugs(bugs?.filter((bug) => isDueToday(bug.due)));
  }, [bugs]);

  return (
    <>
      {error && <h3>Failed to Load Bugs. Please try again</h3>}
      {dueBugs?.length === 0 && <h3>No Bugs Due Today!</h3>}
      {isLoading ? (
        <h3>Loading . . . </h3>
      ) : (
        dueBugs?.map((bug) => <BugModalContainer bug={bug} key={bug._id} />)
      )}
    </>
  );
};

export default DueBugsList;
