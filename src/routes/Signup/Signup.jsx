import React from "react";
import { useRegisterMutation } from "../../redux/authApiSlice";

import OceanBackground from "../../components/OceanBackground/OceanBackground";
import AuthContainer from "../../components/AuthForm/AuthContainer";
import SignupForm from "../../components/AuthForm/SignupForm";

const Signup = () => {
  const { isLoading } = useRegisterMutation();

  return isLoading ? (
    <h1>Loading ...</h1>
  ) : (
    <OceanBackground size="full">
      <AuthContainer type="signup">
        <SignupForm />
      </AuthContainer>
      {/* <div className="signup-container"></div> */}
    </OceanBackground>
  );
};

export default Signup;
