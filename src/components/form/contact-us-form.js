"use client";

import { Form, Button, Col, Row } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactUsForm = () => {
  const initialValues = {
    first_name: "",
    email_address: "",
    phone_number: "",
    contact_method: "",
    message: "Hi!....",
    privacy_policy: false,
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First Name is required"),
    email_address: Yup.string()
      .email("Invalid email address")
      .required("Email Address is required"),
    phone_number: Yup.string().required("Phone Number is required"),
    contact_method: Yup.string().required("Contact Method is required"),
    message: Yup.string().required("Message is required"),
    privacy_policy: Yup.boolean().oneOf(
      [true],
      "You must agree to the Privacy Policy"
    ),
  });

  const handleSubmit = (values) => {
    console.log(values);
    alert("Form Submitted Successfully!");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, values }) => (
        <FormikForm className="p-4 border rounded shadow bg-white">
          <Row className="mb-3">
            <Form.Group as={Col} controlId="first_name">
              <Form.Label>First Name</Form.Label>
              <Field
                type="text"
                name="first_name"
                className="form-control"
                placeholder="Please input"
              />
              <ErrorMessage
                name="first_name"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="email_address">
              <Form.Label>Email Address</Form.Label>
              <Field
                type="email"
                name="email_address"
                className="form-control"
                placeholder="Please input"
              />
              <ErrorMessage
                name="email_address"
                component="div"
                className="text-danger"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="phone_number">
              <Form.Label>Phone Number</Form.Label>
              <Field
                type="text"
                name="phone_number"
                className="form-control"
                placeholder="+000"
              />
              <ErrorMessage
                name="phone_number"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="contact_method">
              <Form.Label>Contact Method</Form.Label>
              <Field as="select" name="contact_method" className="form-select">
                <option value="">Choose method</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </Field>
              <ErrorMessage
                name="contact_method"
                component="div"
                className="text-danger"
              />
            </Form.Group>
          </Row>

          <Form.Group controlId="message" className="mb-3">
            <Form.Label>Message</Form.Label>
            <Field
              as="textarea"
              name="message"
              rows={3}
              className="form-control"
              placeholder="Hi! We are Nexgen..."
            />
            <ErrorMessage
              name="message"
              component="div"
              className="text-danger"
            />
          </Form.Group>

          <Form.Group controlId="privacy_policy" className="mb-3">
            <Field type="checkbox" name="privacy_policy" className="me-2" />
            <Form.Label>I agree with Nexgen Privacy Policy</Form.Label>
            <ErrorMessage
              name="privacy_policy"
              component="div"
              className="text-danger"
            />
          </Form.Group>

          <Button
            type="submit"
            variant="dark"
            className="  c-btn px-4 me-4"
            disabled={!values.privacy_policy}
          >
            Submit
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
};

export default ContactUsForm;
