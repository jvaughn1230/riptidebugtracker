import React, { useState, useEffect } from "react";
import BugModalContainer from "../BugModal/BugModalContainer";
import { useFetchBugsWithPaginationQuery } from "../../redux/apis/bugsApiSlice";

const BugList = () => {
  const [page, setPage] = useState(1);
  const [bugs, setBugs] = useState([]);

  const { data, error, isLoading, isFetching } =
    useFetchBugsWithPaginationQuery(page);

  useEffect(() => {
    if (data) {
      setBugs((prevBugs) => [...prevBugs, ...data.bugs]);
    }
    return () => {
      setBugs([]);
      setPage(1);
    };
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
            <BugModalContainer key={bug._id} bug={bug} />
          ))}
          <button
            className="load-more-button"
            onClick={handleLoadMore}
            disabled={isButtonDisabled}
          >
            {isFetching
              ? "Loading..."
              : isButtonDisabled
              ? "No More Bugs To Load"
              : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default BugList;
