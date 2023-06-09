import React, { useState } from "react";
import TestCard from "../testCard/TestCard";
const Home = () => {
  const [complete, setComplete] = useState(false);

  const handleToggleComplete = () => {
    setComplete(!complete);
  };

  console.log("home complete" + complete);
  return (
    <div>
      <TestCard
        complete={complete}
        handleToggleComplete={handleToggleComplete}
      />
    </div>
  );
};

export default Home;
