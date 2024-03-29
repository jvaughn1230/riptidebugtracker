import React from "react";
import "./Home.css";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/authSlice";
import BugsFilter from "../../components/BugsFilter/BugsFilter";

const Home = () => {
  const user = useSelector(selectCurrentUser);

  const welcome = user ? `Welcome ${user.name}!` : "Welcome!";

  return (
    <div className="home-page">
      <h1 className="welcome-msg">{welcome}</h1>
      <BugsFilter />
    </div>
  );
};

export default Home;
