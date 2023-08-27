import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/authApi";

import "./logout.css";

const Logout = () => {
  const navigate = useNavigate();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging Out...</p>;
  if (isError) return <p>Error: {error.date?.message}</p>;

  return <button onClick={sendLogout}>Logout</button>;
};

export default Logout;
