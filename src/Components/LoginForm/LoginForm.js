import React, { useState, useContext } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Person, Lock } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import useApi from "../../hooks/useApi";
import { endpoints } from "../../defaults";
import AuthContext from "../../contexts/authContext";
import Dashboard from "../Assets/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import Toast from "react-bootstrap/Toast";
import ToastHeader from "react-bootstrap/esm/ToastHeader";
import ToastBody from "react-bootstrap/esm/ToastBody";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [loggedIn, setLogedin] = useState(false);
  const { request: login } = useApi("post");
  const { setCurrentUser } = useContext(AuthContext);
  const handleOnClick = () => navigate("/dashboard");

  const validationSchema = yup.object({
    phone: yup
      .string("Enter your Phone Number")
      .min(10, "Enter a valid phone number")
      .required("phone number is required"),
    password: yup
      .string("Enter your password")
      .min(4, "Password should be of minimum 4 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.phone && values.password) {
        const payload = {
          phone: values.phone,
          password: values.password,
        };
        setLoading(true);
        const apiResponse = await login(endpoints.LOGIN, payload);
        const { response, error } = apiResponse;
        if (response.data) {
          const { data: apiData } = response;
          setCurrentUser(apiData.data);
          handleOnClick();
        } else {
          const { response: errRes } = error;
          <Toast>
            <ToastHeader
              title="Error"
              icon="Cancel"
              iconColor="danger"
              time="Now"
            >
              <ToastBody>
                {errRes?.data?.message ||
                  "Error Occured. Please contact Admin !!"}
              </ToastBody>
            </ToastHeader>
            ,
          </Toast>;
        }
      }
      setLoading(false);
    },
  });

  return (
    <div className="container">
      {loggedIn ? (
        <Dashboard />
      ) : (
        <div className="signin signin_wrapper">
          <form onSubmit={formik.handleSubmit}>
            <h2>Login</h2>
            <TextField
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="textField"
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <Person />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="error_msg">{formik.errors.phone}</div>
            ) : null}
            <TextField
              name="password"
              type="password"
              placeholder="Password"
              className="textField form-label mt-4 "
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <Lock />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error_msg">{formik.errors.password}</div>
            ) : null}
            <button type="submit" class="btn btn-success mt-3">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
