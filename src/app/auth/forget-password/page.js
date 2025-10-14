"use client";
import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form } from "react-bootstrap";

const ForgetPasswordPage = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Forget Password Request:", values);
    setTimeout(() => {
      setSubmitting(false);
      alert("OTP sent to your email!");
    }, 1000);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient-primary">
      <div className="card login-card">
        <div className="card-body p-5 text-center">
          <h3 className="fw-bold text-dark mb-2">Forgot Password</h3>
          <p className="text-muted mb-4">
            Enter your email to receive a reset code
          </p>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div className="mb-3 text-start">
                  <label
                    htmlFor="email"
                    className="form-label fw-semibold text-dark"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger small mt-2"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 rounded-pill shadow-sm fw-semibold py-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send OTP"}
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

export default ForgetPasswordPage;
