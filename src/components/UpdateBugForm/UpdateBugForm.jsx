import React from "react";
import "./UpdateBugForm.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

import * as Yup from "yup";

import {
  formatForDisplay,
  formatForForm,
  formatForBackend,
} from "../../utils/dateFormatter";

import { useFetchProjectsQuery } from "../../redux/apis/projectsApiSlice";
import {
  useUpdateBugMutation,
  useDeleteBugMutation,
} from "../../redux/apis/bugsApiSlice";

const UpdateBugForm = ({ bug, closeModal }) => {
  const [updateBug, { isLoading: updateLoading }] = useUpdateBugMutation();
  const [deleteBug, { isLoading: deleteLoading }] = useDeleteBugMutation();

  const {
    data: projects,
    isError: projectsError,
    isloading: projectsLoading,
  } = useFetchProjectsQuery();

  // Init Values

  const initialValues = {
    id: bug._id,
    issue: bug.issue,
    recreate: bug.recreate,
    status: bug.status,
    createdAt: formatForDisplay(bug.createdAt),
    updatedAt: formatForDisplay(bug.updatedAt),
    due: formatForForm(bug.due),
    updates: bug.updates,
    priority: bug.priority,
    project: !bug.project ? "" : bug.project._id,
  };

  // Validation Schema
  const validationSchema = Yup.object({
    issue: Yup.string().required("Required"),
    recreate: Yup.string().required("Required"),
    status: Yup.number().required("Required"),
    project: Yup.string(),
    createdAt: Yup.date().required("Required"),
    updatedAt: Yup.date().required("Required"),
    updates: Yup.string(),
    priority: Yup.number().required(),
    due: Yup.date().required("Required"),
  });

  // Handle Submit
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
    }
  };

  //   Handle Delete
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      await deleteBug({ id: bug._id });
      toast.success("Deleted Bug!");
      closeModal();
    } catch (err) {
      toast.error("Failed To Delete Bug. Please Try Again!");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="update-bug-form">
          <div className="bug-modal-content">
            {/* Basic Info Section*/}
            <div className="bug-modal-section-container">
              <div className="bug-section bug-info-section">
                <h3>Basic Information</h3>
                <label htmlFor="issue">Issue:</label>
                <Field name="issue" id="issue" type="text" readOnly />
              </div>
              <div className="bug-details-section">
                <label htmlFor="recreate">Details: </label>
                <Field
                  name="recreate"
                  id="recreate"
                  type="text"
                  as="textarea"
                  readOnly
                />
              </div>

              <div className="bug-info-section-dates">
                <label htmlFor="createdAt">Created:</label>
                <Field name="createdAt" id="createdAt" type="text" readOnly />
                <br className="mobile-break" />
                <label htmlFor="updatedAt">Last Update:</label>
                <Field name="updatedAt" id="updatedAt" type="text" readOnly />
              </div>
            </div>

            {/* Project and Status */}
            <div className="bug-section bug-project-section">
              <h3>Project</h3>
              <label htmlFor="project">Project:</label>
              <Field as="select" name="project" id="project">
                <option value="" disabled>
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

            {/* Due Date & Urgency? */}
            <div className="bug-section bug-status-section">
              <h3>Due Date</h3>
              <div className="bug-section-content">
                <label htmlFor="due">Due:</label>
                <Field name="due" id="due" type="date" />
                <ErrorMessage name="due" component="div" />

                <br className="mobile-break" />

                <label htmlFor="status">Status:</label>
                <Field name="status" id="status" as="select" type="number">
                  <option value={1}>Not Started</option>
                  <option value={2}>In Progress</option>
                  <option value={3}>Completed</option>
                </Field>

                <br className="mobile-break" />

                <label htmlFor="priority">Priority:</label>
                <Field as="select" name="priority" id="priority" type="number">
                  <option value={3}>High</option>
                  <option value={2}>Regular</option>
                  <option value={1}>Low</option>
                </Field>
              </div>
            </div>

            {/* Updates Section */}
            <div className="bug-section bug-updates-section">
              <label htmlFor="updates" className="bug-section-header">
                <h3>Updates</h3>
              </label>
              <div>
                <Field name="updates" id="updates" as="textarea" />
              </div>
            </div>

            {/* Buttons */}
            <div className="update-bug-form-buttons">
              <button
                type="submit"
                className="update-bug-btn"
                disabled={updateLoading || !dirty}
              >
                Update
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
