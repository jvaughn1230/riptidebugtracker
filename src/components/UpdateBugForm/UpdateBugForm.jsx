import React from "react";
import "./UpdateBugForm.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

import * as Yup from "yup";

import useDateFormatter from "../../hooks/useDateFormatter";

import { useFetchProjectsQuery } from "../../redux/apis/projectsApiSlice";
import {
  useUpdateBugMutation,
  useDeleteBugMutation,
} from "../../redux/apis/bugsApiSlice";

const UpdateBugForm = ({ bug, closeModal }) => {
  const [updateBug, { isLoading: updateLoading }] = useUpdateBugMutation();
  const [deleteBug, { isLoading: deleteLoading }] = useDeleteBugMutation();

  const { formatForDisplay, formatForForm, formatForBackend } =
    useDateFormatter();

  const {
    data: projects,
    isError: projectsError,
    isloading: projectsLoading,
  } = useFetchProjectsQuery();

  const initialValues = {
    id: bug._id,
    issue: bug.issue,
    status: bug.status,
    createdAt: formatForDisplay(bug.createdAt),
    updatedAt: formatForDisplay(bug.updatedAt),
    due: formatForForm(bug.due),
    updates: bug.updates,
    priority: bug.priority,
    project: bug.project === null ? "" : bug.project._id,
  };

  console.log("init", initialValues);

  const validationSchema = Yup.object({
    issue: Yup.string().required("Required"),
    status: Yup.number().required("Required"),
    project: Yup.string(),
    createdAt: Yup.date().required("Required"),
    updatedAt: Yup.date().required("Required"),
    updates: Yup.string(),
    priority: Yup.number().required(),
    due: Yup.date().required("Required"),
  });

  const handleSubmit = async (values) => {
    if (values.project === "") {
      values.project = null;
    }
    values.due = formatForBackend(values.due);
    values.createdAt = formatForBackend(values.createdAt);
    values.updatedAt = formatForBackend(values.updatedAt);
    try {
      await updateBug(values);
      toast.success("Updated Bug!");
      closeModal();
    } catch (err) {
      toast.error("Failed to Update. Please try again");
      console.log(err);
    }
  };

  //   Handle Delete
  const handleDelete = async () => {
    try {
      await deleteBug({ id: bug._id });
      toast.success("Deleted Bug!");
    } catch (err) {
      toast.error("Failed To Delete Bug. Please Try Again!");
    }
  };

  console.log(bug.project);
  console.log("init project", initialValues.project);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <div className="bug-modal-content">
            <div className="bug-section">
              <h3 className="bug-section-header">Basic Information</h3>
              <div className="bug-section-content">
                <div className="bug-info">
                  <div>
                    <label htmlFor="issue">Issue:</label>
                    <Field name="issue" id="issue" type="text" readOnly />
                  </div>

                  <div>
                    <label htmlFor="status">Status:</label>
                    <Field name="status" id="status" as="select" type="number">
                      <option value={1}>Not Started</option>
                      <option value={2}>In Progress</option>
                      <option value={3}>Completed</option>
                    </Field>
                  </div>

                  <div>
                    <label htmlFor="priority">Priority:</label>
                    <Field
                      as="select"
                      name="priority"
                      id="priority"
                      type="number"
                    >
                      <option value={3}>High</option>
                      <option value={2}>Regular</option>
                      <option value={1}>Low</option>
                    </Field>
                  </div>
                  <div>
                    <label htmlFor="updatedAt">Last Update:</label>
                    <Field
                      name="updatedAt"
                      id="updatedAt"
                      type="text"
                      readOnly
                    />
                  </div>
                  <div>
                    <label name="createdAt">Created:</label>
                    <Field
                      name="createdAt"
                      id="createdAt"
                      type="text"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bug-section">
              <h3 className="bug-section-header">Project</h3>
              <div className="bug-section-content">
                <label htmlFor="project">Project:</label>
                <Field as="select" name="project" id="project">
                  <option value="" disabled selected>
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
            </div>

            {/* Here Next */}
            <div className="bug-section">
              <h5 className="bug-section-header">Due Date</h5>
              <div className="bug-section-content">
                <label htmlFor="due">Due:</label>
                <Field name="due" id="due" type="date" />
                <ErrorMessage name="due" component="div" />
              </div>
            </div>

            {/* Next */}
            <div className="bug-section">
              <h5 className="bug-section-header">Updates</h5>
              <div className="bug-section-content">
                <label htmlFor="updates">Updates:</label>
                <Field name="updates" id="updates" as="textarea" />
              </div>
            </div>

            {/* Last */}
            {/* Footer of Buttons */}
            <div>
              <button
                type="submit"
                className="update-bug-btn"
                disabled={updateLoading}
              >
                Update Bug
              </button>
              <button type="reset">Cancel</button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteLoading}
              >
                Delete
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateBugForm;
