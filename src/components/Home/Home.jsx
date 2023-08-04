import React, { useState } from "react";
// import Riptidebg from "../riptidebg/Riptidebg";
const Home = () => {
  const [complete, setComplete] = useState(false);

  const handleToggleComplete = () => {
    setComplete(!complete);
  };

  console.log("home complete" + complete);
  return <div></div>;
};

export default Home;
