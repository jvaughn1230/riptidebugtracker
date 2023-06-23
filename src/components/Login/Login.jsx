import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { signIn } from "../../redux/authSlice";
import "./login.css";

const Login = () => {
  // const dispatch = useDispatch();

  const [formInput, setFormInput] = useState({
    userName: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    console.log("signed in");
    // dispatch(signIn(formInput));
    // e.preventDefault();
  };

  console.log("signin page loaded");

  return (
    <div className="login page-container">
      <div className="login-container">
        <h1 className="login-header">Log In</h1>
        <form className="login-form">
          <input
            name="userName"
            type="text"
            placeholder="username"
            value={formInput.userName}
            onChange={handleInputChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formInput.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
        </form>

        <p className="login-redirect">
          Dont have an account? Signup <Link to="/signup">here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
