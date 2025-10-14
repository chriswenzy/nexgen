"use client";
import { useState } from "react";
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
  Spinner,
  Modal,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  FaUserPlus,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import "./AddUserForm.css";
import { addUserAsync } from "@/slices/user/userSlice";
import { useDispatch } from "react-redux";

// Validation Schema
const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  role: Yup.string()
    .oneOf(["ADMIN", "CUSTOMER"], "Invalid role")
    .required("Role is required"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "User",
};

export default function AddUserForm({ onSuccess, onCancel }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (
    values,
    { setSubmitting, setStatus, resetForm }
  ) => {
    try {
      const result = await dispatch(addUserAsync({ values: values }));
      console.log("login response", result);
      if (loginAsync.fulfilled.match(result)) {
        router.push("/main/overview");
      } else {
        console.error("Login failed:", result);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    // try {

    //   // Simulate API call
    //   await new Promise((resolve) => setTimeout(resolve, 1500));

    //   // Here you would typically make an API call to create the user
    //   console.log("User data to submit:", {
    //     name: values.name,
    //     email: values.email,
    //     password: values.password,
    //     role: values.role,
    //   });

    //   // Show success modal
    //   setShowSuccessModal(true);
    //   setStatus({ success: true });
    //   resetForm();

    //   // Call onSuccess callback if provided
    //   if (onSuccess) {
    //     onSuccess(values);
    //   }
    // } catch (error) {
    //   setStatus({ error: "Failed to create user. Please try again." });
    // } finally {
    //   setSubmitting(false);
    // }
  };

  const passwordStrength = (password) => {
    if (!password) return { strength: 0, label: "", variant: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    const levels = [
      { label: "Very Weak", variant: "danger" },
      { label: "Weak", variant: "danger" },
      { label: "Fair", variant: "warning" },
      { label: "Good", variant: "info" },
      { label: "Strong", variant: "success" },
    ];

    return { strength, ...(levels[strength - 1] || levels[0]) };
  };

  const PasswordRequirement = ({ met, children }) => (
    <div className={`password-requirement ${met ? "met" : "unmet"}`}>
      {met ? <FaCheck className="me-2" /> : <FaTimes className="me-2" />}
      {children}
    </div>
  );

  return (
    <>
      <Card className="add-user-card">
        <Card.Header className="add-user-header">
          <div className="header-content">
            <FaUserPlus className="header-icon" />
            <div>
              <h2>Add New User</h2>
              <p>Create a new user account with appropriate permissions</p>
            </div>
          </div>
        </Card.Header>

        <Card.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              status,
            }) => {
              const pwStrength = passwordStrength(values.password);

              return (
                <Form onSubmit={handleSubmit} className="user-form">
                  {status?.error && (
                    <Alert variant="danger" className="mb-4">
                      {status.error}
                    </Alert>
                  )}

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="form-label">
                          Full Name <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.name && errors.name}
                          isValid={touched.name && !errors.name}
                          placeholder="Enter full name"
                          className="form-control-custom"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="form-label">
                          Email Address <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.email && errors.email}
                          isValid={touched.email && !errors.email}
                          placeholder="Enter email address"
                          className="form-control-custom"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="form-label">
                          Role <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          name="role"
                          value={values.role}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.role && errors.role}
                          isValid={touched.role && !errors.role}
                          className="form-control-custom"
                        >
                          <option value="CUSTOMER">Customer</option>
                          <option value="ADMIN">Admin</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.role}
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                          {values.role === "ADMIN" &&
                            "Admins have full access to all features"}

                          {values.role === "CUSTOMER" &&
                            "Customer have basic access to platform features"}
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="form-label">
                          Password <span className="text-danger">*</span>
                        </Form.Label>
                        <div className="password-input-group">
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.password && errors.password}
                            isValid={
                              touched.password &&
                              !errors.password &&
                              values.password
                            }
                            placeholder="Create a strong password"
                            className="form-control-custom"
                          />
                          <Button
                            variant="outline-secondary"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            type="button"
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>

                        {/* Password Strength Meter */}
                        {values.password && (
                          <div className="password-strength mt-3">
                            <div className="strength-meter">
                              <div
                                className={`strength-bar ${pwStrength.variant}`}
                                style={{
                                  width: `${(pwStrength.strength / 5) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <div className="strength-label">
                              <small>
                                Password strength:{" "}
                                <strong>{pwStrength.label}</strong>
                              </small>
                            </div>
                          </div>
                        )}

                        {/* Password Requirements */}
                        <div className="password-requirements mt-3">
                          <small className="text-muted">
                            Password must contain:
                          </small>
                          <PasswordRequirement
                            met={values.password.length >= 8}
                          >
                            At least 8 characters
                          </PasswordRequirement>
                          <PasswordRequirement
                            met={/[a-z]/.test(values.password)}
                          >
                            One lowercase letter
                          </PasswordRequirement>
                          <PasswordRequirement
                            met={/[A-Z]/.test(values.password)}
                          >
                            One uppercase letter
                          </PasswordRequirement>
                          <PasswordRequirement
                            met={/[0-9]/.test(values.password)}
                          >
                            One number
                          </PasswordRequirement>
                          <PasswordRequirement
                            met={/[@$!%*?&]/.test(values.password)}
                          >
                            One special character (@$!%*?&)
                          </PasswordRequirement>
                        </div>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="form-label">
                          Confirm Password{" "}
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <div className="password-input-group">
                          <Form.Control
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={
                              touched.confirmPassword && errors.confirmPassword
                            }
                            isValid={
                              touched.confirmPassword &&
                              !errors.confirmPassword &&
                              values.confirmPassword
                            }
                            placeholder="Confirm your password"
                            className="form-control-custom"
                          />
                          <Button
                            variant="outline-secondary"
                            className="password-toggle"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            type="button"
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Role Permissions Summary */}
                  <Card className="role-permissions-card mb-4">
                    <Card.Body>
                      <h6>Role Permissions Summary</h6>
                      <div className="permissions-list">
                        {values.role === "Admin" && (
                          <>
                            <div className="permission-item">
                              ✓ Full system access
                            </div>
                            <div className="permission-item">
                              ✓ User management
                            </div>
                            <div className="permission-item">
                              ✓ Content moderation
                            </div>
                            <div className="permission-item">
                              ✓ System settings
                            </div>
                          </>
                        )}
                        {values.role === "Moderator" && (
                          <>
                            <div className="permission-item">
                              ✓ Content moderation
                            </div>
                            <div className="permission-item">
                              ✓ User management (limited)
                            </div>
                            <div className="permission-item">
                              ✗ System settings
                            </div>
                          </>
                        )}
                        {values.role === "User" && (
                          <>
                            <div className="permission-item">
                              ✓ Basic platform access
                            </div>
                            <div className="permission-item">
                              ✗ User management
                            </div>
                            <div className="permission-item">
                              ✗ Content moderation
                            </div>
                            <div className="permission-item">
                              ✗ System settings
                            </div>
                          </>
                        )}
                      </div>
                    </Card.Body>
                  </Card>

                  <div className="form-actions">
                    <Button
                      variant="outline-secondary"
                      onClick={onCancel}
                      disabled={isSubmitting}
                      className="action-btn"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                      className="action-btn submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Creating User...
                        </>
                      ) : (
                        <>
                          <FaUserPlus className="me-2" />
                          Create User
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Card.Body>
      </Card>

      {/* Success Modal */}
      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered
      >
        <Modal.Header closeButton className="success-modal-header">
          <Modal.Title>
            <FaCheck className="me-2 text-success" />
            User Created Successfully
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center py-3">
            <div className="success-icon mb-3">
              <FaUserPlus />
            </div>
            <h5>User account has been created</h5>
            <p className="text-muted">
              The new user can now access the platform with the provided
              credentials.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
