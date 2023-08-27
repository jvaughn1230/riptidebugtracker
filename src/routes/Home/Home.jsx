import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../../redux/authSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useSelector(selectCurrentUser);
  // const token = useSelector(selectCurrentToken);

  console.log(user);

  const welcome = user ? `Welcome ${user.name}!` : "Welcome!";

  return (
    <div>
      <h1>{welcome}</h1>
    </div>
  );
};

export default Home;
