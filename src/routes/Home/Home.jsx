import React from "react";
import "./home.css";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../../redux/authSlice";
import { Link } from "react-router-dom";
import BugCard from "../../components/BugCard/BugCard";
import { useFetchBugsQuery } from "../../redux/apis/bugsApiSlice";

const Home = () => {
  const user = useSelector(selectCurrentUser);
  // const token = useSelector(selectCurrentToken);

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
      <div>
        <h2>Due Today: </h2>
        <div className="home__row">
          {dueBugs?.map((bug) => (
            <BugCard bug={bug} key={bug.id} />
          ))}
        </div>
      </div>
      <div>
        <h2>Important: </h2>
        <div className="home__row">
          {highPriorityBugs?.map((bug) => (
            <BugCard bug={bug} key={bug.id} />
          ))}
        </div>
      </div>
      <div>
        <h2>Past Due: </h2>
        <div className="home__row">
          {pastDueBugs?.map((bug) => (
            <BugCard bug={bug} key={bug.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
