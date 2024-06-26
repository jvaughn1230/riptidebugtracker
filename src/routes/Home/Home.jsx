import React from "react";
import "./Home.css";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/authSlice";
import RecentBugs from "../../components/BugLists/RecentBugs";
import UpComingBugs from "../../components/BugLists/UpComingBugs";

import StatsCard from "../../components/Stats/StatsCard";
const Home = () => {
  const user = useSelector(selectCurrentUser);

  const welcome = user ? `Welcome ${user.name}!` : "Welcome!";

  return (
    <div className="home-page page">
      <div className="home-page-header">
        <h2 className="welcome-msg">{welcome}</h2>
        <div className="stats-container">
          <StatsCard />
          <StatsCard />
          <StatsCard />
        </div>
      </div>
      <h3>Due Next</h3>
      <div className="bugcards-container">
        <UpComingBugs />
      </div>
      <h3>Recent Bugs</h3>
      <RecentBugs />
    </div>
  );
};

export default Home;
