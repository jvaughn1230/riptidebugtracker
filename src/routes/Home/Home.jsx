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

  const { data, error, isLoading } = useFetchBugsQuery();

  const welcome = user ? `Welcome ${user.name}!` : "Welcome!";

  const getPriorityBugs = data?.filter((item) => item.priority === "High");

  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const getTodaysBugs = data?.filter((item) => {
    let currDate = new Date(item);
    let todaysDate = new Date("2023-10-1");
    return currDate === todaysDate;
  });

  return (
    <div className="homepg">
      <h1 className="welcome-msg">{welcome}</h1>
      <div>
        <h2>Due Today: </h2>
      </div>
      <div>
        <h2>Important: </h2>
      </div>
      <div>
        <h2>Past Due: </h2>
      </div>
    </div>
  );
};

export default Home;
