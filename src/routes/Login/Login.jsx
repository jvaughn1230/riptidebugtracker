import React from "react";

import OceanBackground from "../../components/OceanBackground/OceanBackground";
import AuthContainer from "../../components/AuthForm/AuthContainer";
import LoginForm from "../../components/AuthForm/LoginForm";

const Login = () => {
  return (
    <OceanBackground size="full">
      <AuthContainer type="login">
        <LoginForm />
      </AuthContainer>
    </OceanBackground>
  );
};

export default Login;
