import { useState, useEffect } from "react";

const useTodayDate = () => {
  const [todayDate, setTodayDate] = useState(new Date());

  useEffect(() => {
    const now = new Date();

    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);

    const timeUntilMidnight = midnight - now;

    const timeout = setTimeout(() => {
      setTodayDate(new Date());
    }, timeUntilMidnight);

    return () => clearTimeout(timeout);
  }, []);

  console.log(todayDate);
  return todayDate.toISOString().split("T")[0];
};

export default useTodayDate;
