import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

import * as Yup from "yup";
import "./AddBugForm.css";

import useTodayDate from "../../hooks/useTodayDate";
import useDateFormatter from "../../hooks/useDateFormatter";

import { useAddBugMutation } from "../../redux/apis/bugsApiSlice";
import { useFetchProjectsQuery } from "../../redux/apis/projectsApiSlice";

const AddBugForm = () => {
  const today = useTodayDate();
  const { formatForBackend } = useDateFormatter();

  const [addBug, { isLoading: addBugLoading }] = useAddBugMutation();

  const {
    data: projects,
    isError: projectsError,
    isloading: projectsLoading,
  } = useFetchProjectsQuery();

  // Inital Values
  const initialValues = {
    issue: "",
    recreate: "",
    priority: 2,
    due: today,
    project: "",
  };

  //   Form Validation
  const validationSchema = Yup.object({
    issue: Yup.string().required("Required"),
    recreate: Yup.string().required("Required"),
    priority: Yup.string().required("Required"),
    due: Yup.date()
      .min(today, "Date Cannot Be Before Today")
      .required("Required"),
  });

  //   Handle Submit
  const handleSubmit = (values, onSubmitProps) => {
    if (values.project === "") {
      values.project = null;
    }

    values.due = formatForBackend(values.due);

    try {
      addBug(values);
      toast.success("Bug Added!");
      onSubmitProps.resetForm();
    } catch {
      toast.failed("Failed to add Bug. Please try again");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <div className="field-container">
            <label htmlFor="issue">Issue:</label>
            <Field name="issue" id="issue" type="text" />
            <ErrorMessage name="issue" component="div" />
          </div>

          <div className="field-container">
            <label htmlFor="recreate">Steps to Recreate</label>
            <Field name="recreate" id="recreate" type="text" />
            <ErrorMessage name="recreate" component="div" />
          </div>

          <div className="field-container">
            <label htmlFor="priority">Priority:</label>
            <Field as="select" name="priority" id="priority" type="number">
              <option value={3}>High</option>
              <option value={2}>Regular</option>
              <option value={1}>Low</option>
            </Field>
            <ErrorMessage name="priority" component="div" />
          </div>

          <div className="field-container">
            <label htmlFor="due">Due:</label>
            <Field name="due" id="due" type="date" />
            <ErrorMessage name="due" component="div" />
          </div>

          <div className="field-container">
            <label htmlFor="project">Project:</label>
            <Field as="select" name="project" id="project" type="number">
              <option value="" selected disabled>
                Select Project
              </option>
              {projectsError ? (
                <div>Failed to Load Projects</div>
              ) : projectsLoading ? (
                <option disabled>Loading . . .</option>
              ) : (
                projects?.map((project) => {
                  return (
                    <option key={project._id} value={project._id}>
                      {project.name}
                    </option>
                  );
                })
              )}
            </Field>
          </div>

          <button type="submit" disabled={isSubmitting || !isValid}>
            {addBugLoading ? "Adding Bug" : "Add Bug"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddBugForm;
