import React, { useState, useEffect } from "react";
import NewBugCard from "./newBugCard";
import { useFetchBugsWithPaginationQuery } from "../redux/apis/bugsApiSlice";

const BugList = () => {
  const [page, setPage] = useState(1);
  const [bugs, setBugs] = useState([]);

  const { data, error, isLoading, isFetching } =
    useFetchBugsWithPaginationQuery(page);

  useEffect(() => {
    if (data) {
      setBugs((prevBugs) => [...prevBugs, ...data.bugs]);
    }
  }, [data]);

  const handleLoadMore = () => {
    if (data && page < data.totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const isButtonDisabled = isFetching || (data && page >= data.totalPages);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="bugcards-container">
          {bugs?.map((bug) => (
            <NewBugCard key={bug._id} bug={bug} />
          ))}
          <button onClick={handleLoadMore} disabled={isButtonDisabled}>
            {isFetching ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default BugList;
