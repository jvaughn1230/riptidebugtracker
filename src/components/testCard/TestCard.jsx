import React from "react";
import WaterFill from "../waterFill/WaterFill";
import "./testcard.css";

const TestCard = ({ complete, handleToggleComplete }) => {
  console.log("card complete" + complete);
  return (
    <div className="testcard">
      <button onClick={handleToggleComplete}>
        {complete ? "Reset" : "Fill"}
      </button>
      {complete ? <WaterFill complete={complete} /> : null}
      {/* <WaterFill complete={complete} /> */}
    </div>
  );
};

export default TestCard;
