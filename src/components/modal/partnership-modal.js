"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Modal,
  Button,
  Row,
  Col,
  Form as BootstrapForm,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const PartnershipModal = (props) => {
  const dispatch = useDispatch();

  // Validation schema
  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required("Required"),
    contactPerson: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string().matches(/^[0-9]+$/, "Must be only digits"),
    partnershipType: Yup.string().required("Required"),
    website: Yup.string().url("Invalid URL"),
    businessDescription: Yup.string()
      .required("Required")
      .min(50, "Must be at least 50 characters"),
    termsAgreed: Yup.boolean()
      .oneOf([true], "You must accept the terms")
      .required("Required"),
  });

  const initialValues = {
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    partnershipType: "",
    website: "",
    businessDescription: "",
    termsAgreed: false,
  };

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    // dispatch(submitPartnershipForm(values));
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Become a Partner
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form>
              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Company Name</BootstrapForm.Label>
                <Field
                  as={BootstrapForm.Control}
                  type="text"
                  name="companyName"
                  isInvalid={touched.companyName && !!errors.companyName}
                />
                <ErrorMessage
                  name="companyName"
                  component={BootstrapForm.Control.Feedback}
                  type="invalid"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Contact Person</BootstrapForm.Label>
                <Field
                  as={BootstrapForm.Control}
                  type="text"
                  name="contactPerson"
                  isInvalid={touched.contactPerson && !!errors.contactPerson}
                />
                <ErrorMessage
                  name="contactPerson"
                  component={BootstrapForm.Control.Feedback}
                  type="invalid"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Email Address</BootstrapForm.Label>
                <Field
                  as={BootstrapForm.Control}
                  type="email"
                  name="email"
                  isInvalid={touched.email && !!errors.email}
                />
                <ErrorMessage
                  name="email"
                  component={BootstrapForm.Control.Feedback}
                  type="invalid"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Phone Number</BootstrapForm.Label>
                <Field
                  as={BootstrapForm.Control}
                  type="tel"
                  name="phone"
                  isInvalid={touched.phone && !!errors.phone}
                />
                <ErrorMessage
                  name="phone"
                  component={BootstrapForm.Control.Feedback}
                  type="invalid"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Partnership Type</BootstrapForm.Label>
                <Field
                  as={BootstrapForm.Select}
                  name="partnershipType"
                  isInvalid={
                    touched.partnershipType && !!errors.partnershipType
                  }
                >
                  <option value="">Select partnership type</option>
                  <option value="strategic">Strategic Partnership</option>
                  <option value="technology">Technology Partnership</option>
                  <option value="distribution">Distribution Partnership</option>
                  <option value="reseller">Reseller Partnership</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage
                  name="partnershipType"
                  component={BootstrapForm.Control.Feedback}
                  type="invalid"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Company Website</BootstrapForm.Label>
                <Field
                  as={BootstrapForm.Control}
                  type="url"
                  name="website"
                  placeholder="https://example.com"
                  isInvalid={touched.website && !!errors.website}
                />
                <ErrorMessage
                  name="website"
                  component={BootstrapForm.Control.Feedback}
                  type="invalid"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Business Description</BootstrapForm.Label>
                <Field
                  // as={BootstrapForm.Control}
                  as="textarea"
                  rows={3}
                  name="businessDescription"
                  isInvalid={
                    touched.businessDescription && !!errors.businessDescription
                  }
                />
                <ErrorMessage
                  name="businessDescription"
                  component={BootstrapForm.Control.Feedback}
                  type="invalid"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <Field
                  type="checkbox"
                  as={BootstrapForm.Check}
                  name="termsAgreed"
                  id="termsAgreed"
                  label="I agree to the terms and conditions"
                  isInvalid={touched.termsAgreed && !!errors.termsAgreed}
                />
                <ErrorMessage
                  name="termsAgreed"
                  component={BootstrapForm.Control.Feedback}
                  type="invalid"
                />
              </BootstrapForm.Group>

              <Row className="mt-4">
                <Col md={6}>
                  <Button
                    variant="light"
                    className="w-100"
                    onClick={props.onHide}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col md={6}>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 shadow bg-orange text-white"
                  >
                    Submit Application
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default PartnershipModal;
