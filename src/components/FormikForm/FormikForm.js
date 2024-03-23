import React from "react";
import { Formik } from "formik";
import useTodayDate from "../../hooks/useTodayDate";
import useDateFormatter from "../../hooks/useDateFormatter";
import { useAddBugMutation } from "../../redux/apis/bugsApiSlice";

const FormikForm = () => {
  const { formatForBackend } = useDateFormatter();
  const [addBug, { isLoading, isSuccess }] = useAddBugMutation();

  const today = useTodayDate();

  return (
    <Formik
      initialValues={{
        issue: "",
        recreate: "",
        project: null,
        due: `${today}`,
        priority: 2,
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form className="add-bug-form" id="bug-form">
          <label>Issue:</label>
          {console.log(values)}
          <input
            required
            name="issue"
            type="text"
            value={values.issue}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label>Steps to Recreate:</label>
          <input
            required
            name="recreate"
            type="text"
            value={values.recreate}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label>Priority</label>
          <select
            name="priority"
            value={values.priority}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value={2}>Regular</option>
            <option value={3}>High</option>
            <option value={1}>Low</option>
          </select>

          <label>Due Date:</label>
          <input
            type="date"
            name="due"
            value={values.due}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};

export default FormikForm;
