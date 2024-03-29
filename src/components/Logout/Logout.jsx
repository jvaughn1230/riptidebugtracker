import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/authApiSlice";

import "./Logout.css";

const Logout = ({ className }) => {
  const navigate = useNavigate();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging Out...</p>;
  if (isError) return <p>Error: {error.data?.message}</p>;

  return (
    <button onClick={sendLogout} className={`${className}`}>
      Logout
    </button>
  );
};

export default Logout;
