import React from "react";
import "./NewBugCard.css";
import SidePanel from "./SidePanel/SidePanel";
import moment from "moment/moment";

import { useFetchBugsQuery } from "../redux/apis/bugsApiSlice";

const NewBugCard = () => {
  const { data: bugs, isLoading } = useFetchBugsQuery();
  const bug = bugs && bugs.length > 0 ? bugs[0] : null; // Check if bugs is not empty
  console.log(bugs);
  console.log(bug);

  return (
    <div className="outer">
      {isLoading ? (
        <h2>fetching bug</h2>
      ) : (
        <div className="layer2">
          <div className="test-content-card">
            <p className="large-text-test fade">Id: {bug._id} </p>
            <p className="large-text-test">{bug.issue}</p>
            <p className="small-text-test">{bug.recreate}</p>
            <div>
              <p className="small-text-test fade">Deadline:</p>
              <p className="small-text-test">
                {moment(bug.due).format("MM-DD-YYYY")}
              </p>
            </div>
          </div>
          <div className="side-container">
            <SidePanel />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewBugCard;
