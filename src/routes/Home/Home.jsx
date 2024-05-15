import React from "react";
import "./Home.css";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/authSlice";
import BugsFilter from "../../components/BugsFilter/BugsFilter";
import { useFetchBugsQuery } from "../../redux/apis/bugsApiSlice";
import NewBugCard from "../../components/newBugCard";

import StatsCard from "../../components/Stats/StatsCard";
const Home = () => {
  const { data: bugs, error, isLoading } = useFetchBugsQuery();
  const user = useSelector(selectCurrentUser);

  const welcome = user ? `Welcome ${user.name}!` : "Welcome!";

  return (
    <div className="home-page">
      <div className="flex">
        <h2 className="welcome-msg">{welcome}</h2>
        <div className="stats-container">
          <StatsCard />
          <StatsCard />
          <StatsCard />
        </div>
      </div>

      <h3>UpComing Deadline</h3>
      <div
        style={{
          display: "flex",
          gap: "32px",
          border: "2px solid red",
          flexWrap: "wrap",
        }}
      >
        <NewBugCard />
        <NewBugCard />
        <NewBugCard />
        <NewBugCard />
        <NewBugCard />
      </div>

      <h3>Recently Added</h3>
      <div>
        <NewBugCard />
        <NewBugCard />
        <NewBugCard />
        <NewBugCard />
      </div>

      {/* <BugsFilter /> */}
    </div>
  );
};

export default Home;
