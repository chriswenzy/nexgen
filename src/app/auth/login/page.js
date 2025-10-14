"use client";
import React, { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginAsync } from "@/slices/auth/authSlice";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Submit handler
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await dispatch(loginAsync({ values: values }));
      console.log("login response", result);
      if (loginAsync.fulfilled.match(result)) {
        router.push("/main/overview");
      } else {
        console.error("Login failed:", result);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    // console.log("Form Data:", values);
    // setTimeout(() => {
    //   setSubmitting(false);
    //   alert("Login successful!");
    // }, 1000);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient-primary">
      <div className="card login-card">
        <div className="card-body p-5">
          {/* Logo/Header */}
          <div className="text-center mb-4">
            <div className="logo-container mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-lock"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3 className="fw-bold text-dark">Welcome Back</h3>
            <p className="text-muted">Sign in to your account to continue</p>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label fw-semibold text-dark"
                  >
                    Email
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-mail text-muted"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </span>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="form-control form-control-lg border-start-0"
                      placeholder="Enter your email"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger small mt-2 animate-fade-in"
                  />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="form-label fw-semibold text-dark"
                  >
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-lock text-muted"
                      >
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="11"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </span>
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className="form-control form-control-lg border-start-0"
                      placeholder="Enter your password"
                    />
                    <span
                      className="input-group-text bg-transparent cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-eye text-muted"
                      >
                        {showPassword ? (
                          <>
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </>
                        ) : (
                          <>
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </>
                        )}
                      </svg>
                    </span>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger small mt-2 animate-fade-in"
                  />
                </div>

                {/* Remember me & Forgot Password */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                    />
                    <label
                      className="form-check-label text-muted small"
                      htmlFor="rememberMe"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="small text-decoration-none text-primary fw-semibold"
                  >
                    Forgot Password?
                  </a>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 rounded-pill shadow-sm fw-semibold py-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>

                {/* Divider */}
                <div className="divider my-4">
                  <span className="text-muted small">or continue with</span>
                </div>

                {/* Social Login */}
                <div className="d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-light btn-sm rounded-pill d-flex align-items-center justify-content-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-google me-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                    </svg>
                    Sign in with Google
                  </button>
                </div>

                {/* Sign up link */}
                <div className="text-center mt-4">
                  <span className="text-muted small">
                    Don't have an account?{" "}
                  </span>
                  <a
                    href="#"
                    className="small text-decoration-none text-primary fw-semibold"
                  >
                    Create Account
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

export default LoginPage;
