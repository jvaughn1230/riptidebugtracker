import React from "react";
import "./home.css";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/authSlice";
import { useFetchBugsQuery } from "../../redux/apis/bugsApiSlice";
import BugModalContainer from "../../components/BugModalContainer";
// Temp
import AddBugForm from "../../components/AddBugForm/AddBugForm";
import { toast } from "react-toastify";
import { useAddBugMutation } from "../../redux/apis/bugsApiSlice";

const Home = () => {
  const user = useSelector(selectCurrentUser);

  const [{ isSuccess: addBugSuccess, isError: addBugError }] =
    useAddBugMutation();

  const { data: bugs, error, isLoading } = useFetchBugsQuery();

  const welcome = user ? `Welcome ${user.name}!` : "Welcome!";

  const isDueToday = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);

    const formattedToday = new Intl.DateTimeFormat("en-US").format(today);
    const formattedDue = new Intl.DateTimeFormat("en-US").format(due);

    return formattedDue === formattedToday;
  };

  const isPastDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);

    const formattedToday = new Intl.DateTimeFormat("en-US").format(today);
    const formattedDue = new Intl.DateTimeFormat("en-US").format(due);

    return formattedDue < formattedToday;
  };

  // Sort Bugs
  const highPriorityBugs = bugs?.filter((bug) => bug.priority === 3);

  const pastDueBugs = bugs?.filter((bug) => {
    return isPastDue(bug.due);
  });

  const dueBugs = bugs?.filter((bug) => {
    return isDueToday(bug.due);
  });

  return (
    <div className="homepg">
      <h1 className="welcome-msg">{welcome}</h1>
      {addBugSuccess && toast.success("Bug Added!")}
      <AddBugForm />
      {error && (
        <div className="error-msg">There was an error. Please try again.</div>
      )}
      <div className={error ? "" : "hide"}>
        There was an error. Please try again
      </div>
      <div>
        <h2 className="home__subtitle">Due Today </h2>
        <div className="home__row">
          {isLoading ? (
            <h3>Loading . . . </h3>
          ) : (
            dueBugs?.map((bug) => <BugModalContainer bug={bug} key={bug.id} />)
          )}
        </div>
      </div>
      <div>
        <h2 className="home__subtitle">Important </h2>
        <div className="home__row">
          {isLoading ? (
            <h3>Loading . . .</h3>
          ) : (
            highPriorityBugs?.map((bug) => (
              <BugModalContainer bug={bug} key={bug.id} />
            ))
          )}
        </div>
      </div>
      <div>
        <h2 className="home__subtitle">Past Due </h2>
        <div className="home__row">
          {isLoading ? (
            <h3>Loading . . .</h3>
          ) : (
            pastDueBugs?.map((bug) => (
              <BugModalContainer bug={bug} key={bug.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
