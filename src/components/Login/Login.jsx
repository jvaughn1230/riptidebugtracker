import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  return (
    <div className="login page-container">
      <h1 className="login-header">Log In</h1>
      <h3 className="login-redirect">
        Dont have an account? Signup <Link to="/signup">here</Link>
      </h3>
      <div className="login-container">Login Here</div>
    </div>
  );
};

export default Login;
