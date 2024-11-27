import React, { useRef, useEffect } from "react";
import { AuthButton } from "../Button/Button.styles";
import "./AuthForms.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../redux/authSlice";
import { useRegisterMutation } from "../../redux/authApiSlice";

// Sign Up Schema
const SignupFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Please Confirm Password"),
});

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameRef = useRef();
  const [register] = useRegisterMutation();

  //   OnLoad Focus
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const userData = await register(values).unwrap();
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
      validationSchema={SignupFormSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid }) => (
        <Form className="auth-form">
          <Field
            name="name"
            id="name"
            type="name"
            placeholder="Name"
            innerRef={nameRef}
            className="auth-input"
          />
          <ErrorMessage name="name" component="div" className="err-msg" />

          <Field
            name="email"
            id="email"
            type="email"
            placeholder="Email"
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

          <Field
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            placeholder="Please Confirm Password"
            className="auth-input"
          />
          <ErrorMessage
            name="confirmPassword"
            component="div"
            className="err-msg"
          />

          <AuthButton type="submit" disabled={isSubmitting || !isValid}>
            {isSubmitting ? "Submitting..." : "Register"}
          </AuthButton>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
