import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../../redux/authSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const welcome = user ? `Welcome ${user.email}!` : "Welceome!";

  return <div>Home</div>;
};

export default Home;
