import React, { useState, useEffect } from "react";
import { useFetchBugsQuery } from "../redux/apis/bugsApiSlice";
import BugModalContainer from "./BugModalContainer";

const PastDueBugsList = () => {
  const [pastDueBugs, setPastDueBugs] = useState([]);
  const { data: bugs, error, isLoading } = useFetchBugsQuery();

  //   Format & Compare Dates
  const isPastDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);

    const formattedToday = new Intl.DateTimeFormat("en-US").format(today);
    const formattedDue = new Intl.DateTimeFormat("en-US").format(due);

    return formattedDue < formattedToday;
  };

  useEffect(() => {
    if (bugs) setPastDueBugs(bugs?.filter((bug) => isPastDue(bug.due)));
  }, [bugs]);

  return (
    <div>
      {error && <h3>Failed to Load Bugs. Please try again</h3>}
      {pastDueBugs?.length === 0 && <h3>No Past Due Bugs</h3>}
      {isLoading ? (
        <h3>Loading . . .</h3>
      ) : (
        pastDueBugs?.map((bug) => <BugModalContainer bug={bug} key={bug._id} />)
      )}
    </div>
  );
};

export default PastDueBugsList;
