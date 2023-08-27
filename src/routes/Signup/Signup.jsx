import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/authApi";
import "./signup.css";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";

const Signup = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errMsg, setErrMsg] = useState("");

  const [register, { isLoading }] = useRegisterMutation();

  const nameRef = useRef();
  const errRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Onload Focus
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  // Clear Error
  useEffect(() => {
    setErrMsg("");
  }, [input.name, input.password, input.confirmPassword, input.email]);

  //handlers
  const handleChange = (e) => {
    setInput((input) => ({
      ...input,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = input;

    try {
      const userData = await register({ email, password, name }).unwrap();
      dispatch(setCredentials({ ...userData, email }));
      setInput({
        name: "",
        email: "",
        password: "",
        setPassword: "",
      });
      //TODO: Fix Route Name
      navigate("/account");
    } catch (err) {
      // ToDO: Check Server Errors
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return isLoading ? (
    <h1>Loading ...</h1>
  ) : (
    <div className="signup-page">
      <div className="signup-container">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
          {errMsg}
        </p>
        <h1 className="signup-title">Create a Free Acount</h1>
        <form className="signup-form">
          <input
            type="text"
            label="name"
            name="name"
            placeholder="Name"
            ref={nameRef}
            value={input.name}
            onChange={handleChange}
          />

          <input
            type="email"
            label="email"
            name="email"
            placeholder="Email"
            value={input.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            label="password"
            name="password"
            placeholder="Password"
            value={input.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            label="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={input.confirmPassword}
            onChange={handleChange}
            required
          />
          <span></span>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
        <p className="signup-redirect">
          Already have an account? Login <Link to="/">here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
