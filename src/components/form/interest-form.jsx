import React from "react";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { addDirectMessageAsync } from "../../slices/direct-message/directMessageSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const initialValues = {
  fullname: "",
  phone_number: "",
  email_address: "",
  message: "",
};

const validationSchema = Yup.object({
  fullname: Yup.string().required("Full name is required"),
  phone_number: Yup.string().required("Phone number is required"),
  email_address: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  message: Yup.string().required("Message is required"),
});

const InterestForm = (data) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      ...values,
      recipient: data?.data,
    };
    try {
      const res = await dispatch(addDirectMessageAsync(payload));
      if (res.payload.status === "success") {
        toast.success("Form submitted successfully!");
        resetForm(); // Clear the form fields after successful submission
      } else {
        toast.error("Failed to save property floor plan.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, values, errors, touched }) => (
        <FormikForm>
          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Control
              type="text"
              placeholder="Your full name"
              value={values.fullname}
              onChange={handleChange}
              name="fullname"
            />
            {errors.fullname && touched.fullname && (
              <div className="text-danger">{errors.fullname}</div>
            )}
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Control
              type="tel"
              placeholder="Your phone number"
              value={values.phone_number}
              onChange={handleChange}
              name="phone_number"
            />
            {errors.phone_number && touched.phone_number && (
              <div className="text-danger">{errors.phone_number}</div>
            )}
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Control
              type="email"
              placeholder="Your email address"
              value={values.email_address}
              onChange={handleChange}
              name="email_address"
            />
            {errors.email_address && touched.email_address && (
              <div className="text-danger">{errors.email_address}</div>
            )}
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Control
              as="textarea"
              placeholder="Your message"
              value={values.message}
              onChange={handleChange}
              name="message"
            />
            {errors.message && touched.message && (
              <div className="text-danger">{errors.message}</div>
            )}
          </BootstrapForm.Group>

          <Button className="w-100 bg-2 border-0 py-3 fw-bold" type="submit">
            Send Message
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
};

export default InterestForm;
