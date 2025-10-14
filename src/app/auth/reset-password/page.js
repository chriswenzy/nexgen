"use client";
import React, { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form } from "react-bootstrap";

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm your password"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Password Reset:", values);
    setTimeout(() => {
      setSubmitting(false);
      alert("Password reset successful!");
    }, 1000);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient-primary">
      <div className="card login-card">
        <div className="card-body p-5 text-center">
          <h3 className="fw-bold text-dark mb-2">Reset Password</h3>
          <p className="text-muted mb-4">
            Create a new password for your account
          </p>

          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                {/* New Password */}
                <div className="mb-3 text-start">
                  <label
                    htmlFor="password"
                    className="form-label fw-semibold text-dark"
                  >
                    New Password
                  </label>
                  <div className="input-group">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className="form-control form-control-lg border-start-0"
                      placeholder="Enter new password"
                    />
                    <span
                      className="input-group-text bg-transparent cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </span>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger small mt-2"
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-4 text-start">
                  <label
                    htmlFor="confirmPassword"
                    className="form-label fw-semibold text-dark"
                  >
                    Confirm Password
                  </label>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    className="form-control form-control-lg"
                    placeholder="Re-enter new password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-danger small mt-2"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 rounded-pill shadow-sm fw-semibold py-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </button>

                <div className="text-center mt-4">
                  <a
                    href="/login"
                    className="small text-decoration-none text-primary fw-semibold"
                  >
                    Back to Login
                  </a>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
