import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  console.log("signup page loaded");

  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1 className="signup-title">Create A Free Account</h1>
        <form className="signup-form">
          <input
            type="text"
            label="firstName"
            name="firstName"
            placeholder="First Name...."
          />
          <input
            type="text"
            label="lastName"
            name="lastName"
            placeholder="Last Name...."
          />
          <input
            type="text"
            label="userName"
            name="userName"
            placeholder="Desired Username...."
          />
          <input type="email" label="email" placeholder="Your Email...." />
          <input type="password" label="password" placeholder="password...." />
          <input
            type="password"
            label="password"
            placeholder="confirm password...."
          />
          <button>Submit</button>
        </form>
        <p>
          Already have an account? Login <Link to="/">here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
