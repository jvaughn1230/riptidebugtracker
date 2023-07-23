import React, { useState } from "react";
import "./waterfill.css";

const WaterFill = () => {
  const [isComplete, setIsComplete] = useState(false);
  const handleCardClick = () => {
    setIsComplete(!isComplete);
  };

  return (
    <div className="wave2">
      <div
        className={`wave2-box ${isComplete ? "wave2-show" : "hide"}`}
        onClick={handleCardClick}
      >
        <div className={`wave2 ${isComplete ? "wave2-top" : ""}`}></div>
      </div>
    </div>
  );
};

export default WaterFill;
