import React from "react";
import { Link } from "react-router-dom";
import usePersist from "../../hooks/usePersist";

const AuthContainer = ({ type, children }) => {
  const [persist, setPersist] = usePersist();

  // Prop check
  if (type === null) throw Error("type prop is required");
  if (type !== "signup" && type !== "login")
    throw Error("type must be login or signup");

  // formType check & conditional content
  const isLogin = type === "login" ? true : false;
  const redirectMsg = isLogin ? (
    <div>
      Don't have an account? <Link to="/signup">Sign up</Link>
    </div>
  ) : (
    <div>
      Already have an account? <Link to="/">Login</Link>
    </div>
  );

  const handleToggle = (e) => setPersist((prev) => !prev);

  return (
    <div className="auth-container">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      {children}
      {redirectMsg}

      {/* Persist */}
      <div className="persist-toggle">
        <label htmlFor="persist">
          <input
            type="checkbox"
            id="persist"
            onChange={handleToggle}
            checked={persist}
          />
          Trust This Device?
        </label>
      </div>
    </div>
  );
};

export default AuthContainer;
