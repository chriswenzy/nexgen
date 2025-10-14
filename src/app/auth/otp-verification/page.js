"use client";
import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form } from "react-bootstrap";

const OtpVerificationPage = () => {
  const validationSchema = Yup.object({
    otp: Yup.string()
      .length(6, "OTP must be 6 digits")
      .required("OTP is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("OTP Submitted:", values);
    setTimeout(() => {
      setSubmitting(false);
      alert("OTP verified successfully!");
    }, 1000);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient-primary">
      <div className="card login-card">
        <div className="card-body p-5 text-center">
          <h3 className="fw-bold text-dark mb-2">Verify OTP</h3>
          <p className="text-muted mb-4">
            Enter the 6-digit code sent to your email
          </p>

          <Formik
            initialValues={{ otp: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div className="mb-3 text-start">
                  <label
                    htmlFor="otp"
                    className="form-label fw-semibold text-dark"
                  >
                    OTP Code
                  </label>
                  <Field
                    type="text"
                    name="otp"
                    id="otp"
                    maxLength="6"
                    className="form-control form-control-lg text-center"
                    placeholder="Enter OTP"
                  />
                  <ErrorMessage
                    name="otp"
                    component="div"
                    className="text-danger small mt-2"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 rounded-pill shadow-sm fw-semibold py-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Verifying..." : "Verify OTP"}
                </button>

                <div className="text-center mt-4">
                  <span className="text-muted small">
                    Didn’t get the code?{" "}
                  </span>
                  <a
                    href="#"
                    className="small text-decoration-none text-primary fw-semibold"
                  >
                    Resend OTP
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

export default OtpVerificationPage;
