import React, { useState, useEffect, useRef } from "react";
import FOG from "vanta/dist/vanta.fog.min";

import "./OceanBackground.css";

const OceanBackground = ({ children, size }) => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 20.0,
          minWidth: 20.0,
          highlightColor: "#082139",
          midtoneColor: "#1005ce",
          lowlightColor: "#d6dede",
          baseColor: "#0f1b27",
          blurFactor: 0.33,
          speed: 2.9,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <div
      ref={myRef}
      className={`${size === "full" ? "ocean-background" : "ocean-sidebar"}`}
    >
      {children}
    </div>
  );
};

export default OceanBackground;
