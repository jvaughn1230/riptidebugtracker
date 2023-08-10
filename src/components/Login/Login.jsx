import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../../redux/authSlice";
import { useLoginMutation } from "../../redux/authApi";
import "./login.css";

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  //On Load Focus
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  //Clear Error
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  //Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, email }));
      setEmail("");
      setPassword("");
      //TODO: Fix Route Name
      navigate("/account/bugs");
    } catch (err) {
      // ToDO: Check Server Errors
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  // Input handlers
  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);

  return isLoading ? (
    <h1>Loading ...</h1>
  ) : (
    <section className="login page-container">
      <div className="login-container">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
          {errMsg}
        </p>
        <h1 className="login-header">Log In</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            name="user"
            type="text"
            placeholder="Email"
            ref={emailRef}
            value={email}
            onChange={handleEmailInput}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordInput}
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
    </section>
  );
};

export default Login;
