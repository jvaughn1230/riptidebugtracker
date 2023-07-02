import React, { useState, useEffect } from "react";
import "./waterfill.css";

const WaterFill = ({ complete }) => {
  console.log("waterfill complete" + complete);
  return (
    <div className="waterfill">
      <div className="wave-container">
        <div className="wave"></div>
      </div>
    </div>
  );
};

export default WaterFill;

// const [fillPerecntage, setFillPercentage] = useState(0);

// useEffect(() => {
//   if (complete) {
//     setFillPercentage(100);
//   } else {
//     setFillPercentage(0);
//   }
// }, [complete]);

// style={{ height: `${fillPerecntage}%` }}
