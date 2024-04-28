import React, { useRef, useEffect } from "react";
import { AuthButton } from "../Button/Button.styles";
import "./AuthForms.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../redux/authSlice";
import { useLoginMutation } from "../../redux/authApiSlice";

// Login Schema
const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const [login] = useLoginMutation();

  //   OnLoad Focus
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const userData = await login(values).unwrap();
      dispatch(setCredentials({ ...userData, email: values.email }));
      navigate("/account");
    } catch (err) {
      toast.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginFormSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid }) => (
        <Form className="auth-form">
          <Field
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            innerRef={emailRef}
            className="auth-input"
          />
          <ErrorMessage name="email" component="div" className="err-msg" />

          <Field
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="auth-input"
          />
          <ErrorMessage name="password" component="div" className="err-msg" />

          <AuthButton type="submit" disabled={isSubmitting || !isValid}>
            {isSubmitting ? "Submitting..." : "Login"}
          </AuthButton>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
