import React, { useState } from "react";
import ImportantBugsList from "../ImportantBugsList";
import PastDueBugsList from "../PastDueBugsList";
import DueBugsList from "../DueBugsList";
import "./BugsFilter.css";

const BugsFilter = () => {
  const [filter, setFilter] = useState(1);

  const filteredBugsList = () => {
    if (filter === 1) return <DueBugsList />;
    else if (filter === 2) return <PastDueBugsList />;
    else if (filter === 3) return <ImportantBugsList />;
    else return <h1>There Was An Error</h1>;
  };

  return (
    <div className="filter-container">
      <div className="tabs-container">
        <button
          className={`${filter === 1 ? "selected-tab tab" : "tab"}`}
          onClick={() => setFilter(1)}
        >
          Due Today
        </button>
        <button
          className={`${filter === 2 ? "selected-tab tab" : "tab"}`}
          onClick={() => setFilter(2)}
        >
          Past Due
        </button>
        <button
          className={`${filter === 3 ? "selected-tab tab" : "tab"}`}
          onClick={() => setFilter(3)}
        >
          High Priority
        </button>
      </div>
      {filteredBugsList()}
    </div>
  );
};

export default BugsFilter;
