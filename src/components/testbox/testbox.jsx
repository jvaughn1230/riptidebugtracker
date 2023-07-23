import React from "react";
import Wave3 from "../wave3/Wave3";

const testbox = (props) => {
  return (
    <div style={{ height: props.height + "px", width: props.width + "px" }}>
      <h3>Box{props.number}</h3>
      <Wave3 />
    </div>
  );
};

export default testbox;
