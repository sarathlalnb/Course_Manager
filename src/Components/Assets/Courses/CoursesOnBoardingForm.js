import { React, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import { endpoints } from "../../../defaults";
import { useNavigate } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import Toast from "react-bootstrap/Toast";
import ToastHeader from "react-bootstrap/esm/ToastHeader";
import ToastBody from "react-bootstrap/esm/ToastBody";

const CoursesOnBoardingForm = (course) => {
  const [edit, setEdit] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const { request: updateCourse } = useApi("patch");
  const navigate = useNavigate();
  useEffect(() => {
    if (course) {
      setEdit(true);
    }
  }, [course]);
  const validationSchema = yup.object({
    full_name: yup.string("Enter Details").required("required"),
    title: yup.string("Enter Details").required("required"),
    offline_fees: yup.string("Enter Details").required("required"),
    online_fees: yup.string("Enter Details").required("required"),
  });

  const formik = useFormik({
    initialValues: {
      full_name: course?.result.full_name || "",

      title: course?.result.title || "",
      description: course?.result.description || "",
      cochin_date: course?.result.cochin_date || "",
      calicut_date: course?.result.calicut_date || "",
      duration: course?.result.duration || "",
      offline_fees: course?.result.offline_fees || "",
      online_fees: course?.result.online_fees || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setTimeout(handleSave, 200);
    },
  });
  const handleSave = async () => {
    try {
      let apiResponse;
      const payload = formik.values;
      const id = course.result.id;
      const uri = `${endpoints.UPDATE_COURSE}/${id}/`;
      apiResponse = await updateCourse(uri, payload);
      const { response, error } = apiResponse;
      if (!error && response.data) {
        setShowSuccess(true);
        setShowError(false);
      } else {
        setShowError(true);
        setShowSuccess(false);
      }
    } catch (error) {
      console.error("Error occurred during form submission:", error);
      setShowError(true);
      setShowSuccess(false);
    }
  };

  const handleCancel = () => navigate("/dashboard");

  return (
    <div>
      <h2 align="center" style={{ marginTop: "50px" }}>
        {edit ? "Update Course Details" : "Create New Course"}
      </h2>
      <form onSubmit={formik.handleSubmit} className="secondary">
        <TextField
          fullWidth
          id="full_name"
          name="full_name"
          label="Course Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.full_name}
          error={formik.touched.full_name && Boolean(formik.errors.full_name)}
          helperText={formik.touched.full_name && formik.errors.full_name}
          InputLabelProps={{
            style: { color: "grey" },
          }}
        />
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Course Title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          InputLabelProps={{
            style: { color: "grey" },
          }}
        />
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Course description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          InputLabelProps={{
            style: { color: "grey" },
          }}
        />
        <TextField
          fullWidth
          id="duration"
          name="duration"
          label="Course duration"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.duration}
          error={formik.touched.duration && Boolean(formik.errors.duration)}
          helperText={formik.touched.duration && formik.errors.duration}
          InputLabelProps={{
            style: { color: "grey" },
          }}
        />
        <TextField
          fullWidth
          id="online_fees"
          name="online_fees"
          label="online fees "
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.online_fees}
          error={
            formik.touched.online_fees && Boolean(formik.errors.online_fees)
          }
          helperText={formik.touched.online_fees && formik.errors.online_fees}
          InputLabelProps={{
            style: { color: "grey" },
          }}
        />
        <TextField
          fullWidth
          id="offline_fees"
          name="offline_fees"
          label="offline fees "
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.offline_fees}
          error={
            formik.touched.offline_fees && Boolean(formik.errors.offline_fees)
          }
          helperText={formik.touched.offline_fees && formik.errors.offline_fees}
          InputLabelProps={{
            style: { color: "grey" },
          }}
        />
        <DatePicker
          fullWidth
          id="cochin_date"
          name="cochin_date"
          label="Start Date (Cochin)"
          value={formik.values.cochin_date}
          onChange={(date) => formik.setFieldValue("cochin_date", date)}
          renderInput={(params) => (
            <TextField
              {...params}
              error={
                formik.touched.cochin_date && Boolean(formik.errors.cochin_date)
              }
              helperText={
                formik.touched.cochin_date && formik.errors.cochin_date
              }
              InputLabelProps={{
                style: { color: "grey" },
              }}
            />
          )}
        />

        <div className="text-center mt-3">
          <button
            type="submit"
            className="btn btn-success "
            onClick={handleSave}
          >
            Submit
          </button>
        </div>
      </form>
      {showSuccess && (
        <span className="d-flex align-items-center">
          <span>Saved Successfully</span>
        </span>
      )}

      {showError && (
        <Toast>
          <ToastHeader
            title="Error"
            icon="Cancel"
            iconColor="danger"
            time="Now"
          >
            <ToastBody>{"Error Occurred. Please contact Admin !!"}</ToastBody>
          </ToastHeader>
        </Toast>
      )}
    </div>
  );
};

export default CoursesOnBoardingForm;
