import React from "react";
import "./signup.css";

const Signup = () => {
  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1 className="signup-title">Create A Free Account</h1>
        <form className="signup-form">
          <div>
            <label>First Name: </label>
            <input type="text" label="firstname" placeholder="First Name...." />
            <label>Last Name: </label>
            <input type="text" label="lastname" placeholder="Last Name...." />
          </div>
          <div>
            <label>Username</label>
            <input
              type="text"
              label="username"
              placeholder="Desired Username...."
            />
            <label>Email:</label>
            <input type="email" label="email" placeholder="Your Email...." />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              label="password"
              placeholder="password...."
            />
            <label>Confirm Password</label>
            <input
              type="password"
              label="password"
              placeholder="confirm password...."
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
