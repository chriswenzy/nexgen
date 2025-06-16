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
    fullName: Yup.string().required("Required"),
    companyName: Yup.string(),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string().required("Required"),
    role: Yup.string().required("Required"),
    projectTypes: Yup.array().min(1, "Select at least one project type"),
    paintVolume: Yup.string().required("Required"),
    paintTypes: Yup.array().min(1, "Select at least one paint type"),
    cityState: Yup.string().required("Required"),
    worksMultipleStates: Yup.boolean(),
    partnerAgreement: Yup.boolean()
      .oneOf([true], "You must agree to become a partner")
      .required("Required"),
  });

  const initialValues = {
    fullName: "",
    companyName: "",
    email: "",
    phone: "+234 ",
    role: "",
    projectTypes: [],
    otherProjectType: "",
    paintVolume: "",
    paintTypes: [],
    cityState: "",
    worksMultipleStates: false,
    otherStates: "",
    additionalNotes: "",
    partnerAgreement: false,
  };

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    // dispatch(submitPartnershipForm(values));
    props.onHide();
  };

  const roles = [
    "Contractor",
    "Real Estate Developer",
    "Professional Painter",
    "Construction Company",
    "Building Consultant",
    "Other",
  ];

  const projectTypeOptions = [
    "Residential Housing",
    "Commercial Properties",
    "Estates",
    "Industrial Sites",
    "Renovations",
    "Others",
  ];

  const paintVolumeOptions = [
    "Less than 100L",
    "100-500L",
    "500-1000L",
    "Over 1000L",
  ];

  const paintTypeOptions = [
    "Interior",
    "Exterior",
    "Industrial",
    "Primers",
    "Textured/Decorative Finishes",
  ];

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Let&apos;s Build Beautiful Spaces Together
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-5">
        <p className="mb-4">
          Are you a contractor, painter, builder, or real estate developer
          interested in high-quality paint solutions, exclusive bulk pricing,
          and priority service?
        </p>
        <p className="mb-4">
          Fill out this form and we&apos;ll reach out to you within 24–48 hours
          to explore how we can work together.
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, values }) => (
            <Form>
              <h5 className="mb-3">PARTNERSHIP FORM</h5>

              <Row>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Full Name</BootstrapForm.Label>
                    <Field
                      as={BootstrapForm.Control}
                      type="text"
                      name="fullName"
                      isInvalid={touched.fullName && !!errors.fullName}
                    />
                    <ErrorMessage
                      name="fullName"
                      component={BootstrapForm.Control.Feedback}
                      type="invalid"
                    />
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>
                      Business/Company Name (If Any)
                    </BootstrapForm.Label>
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
                </Col>
              </Row>

              <Row>
                <Col md={6}>
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
                </Col>

                <Col md={6}>
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
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Your Role</BootstrapForm.Label>
                    <div>
                      {roles.map((role) => (
                        <div key={role} className="form-check">
                          <Field
                            type="radio"
                            name="role"
                            value={role}
                            id={`role-${role}`}
                            className="form-check-input"
                            as="input"
                          />
                          <label
                            htmlFor={`role-${role}`}
                            className="form-check-label"
                          >
                            {role}
                          </label>
                        </div>
                      ))}
                    </div>
                    <ErrorMessage
                      name="role"
                      component={BootstrapForm.Control.Feedback}
                      type="invalid"
                    />
                  </BootstrapForm.Group>

                  {values.role === "Other" && (
                    <BootstrapForm.Group className="mb-3">
                      <BootstrapForm.Label>
                        Please specify your role
                      </BootstrapForm.Label>
                      <Field
                        as={BootstrapForm.Control}
                        type="text"
                        name="otherRole"
                      />
                    </BootstrapForm.Group>
                  )}
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>
                      Project & Paint Needs
                    </BootstrapForm.Label>
                    <BootstrapForm.Label className="d-block">
                      Typical Project Type (Select all that apply):
                    </BootstrapForm.Label>
                    <div>
                      {projectTypeOptions.map((type) => (
                        <div key={type} className="form-check">
                          <Field
                            type="checkbox"
                            name="projectTypes"
                            value={type}
                            id={`project-${type}`}
                            className="form-check-input"
                            as="input"
                          />
                          <label
                            htmlFor={`project-${type}`}
                            className="form-check-label"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                    {/* <ErrorMessage
                  name="projectTypes"
                  component={BootstrapForm.Control.Feedback"
                  type="invalid"
                /> */}
                  </BootstrapForm.Group>

                  {values.projectTypes.includes("Others") && (
                    <BootstrapForm.Group className="mb-3">
                      <BootstrapForm.Label>
                        Please specify other project types
                      </BootstrapForm.Label>
                      <Field
                        as={BootstrapForm.Control}
                        type="text"
                        name="otherProjectType"
                      />
                    </BootstrapForm.Group>
                  )}
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  {" "}
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>
                      Average Monthly Paint Volume (Estimate)
                    </BootstrapForm.Label>
                    <Field
                      as={BootstrapForm.Select}
                      name="paintVolume"
                      isInvalid={touched.paintVolume && !!errors.paintVolume}
                    >
                      <option value="">Select volume</option>
                      {paintVolumeOptions.map((volume) => (
                        <option key={volume} value={volume}>
                          {volume}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="paintVolume"
                      component={BootstrapForm.Control.Feedback}
                      type="invalid"
                    />
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label className="d-block">
                      Preferred Paint Types:
                    </BootstrapForm.Label>
                    <div>
                      {paintTypeOptions.map((type) => (
                        <div key={type} className="form-check">
                          <Field
                            type="checkbox"
                            name="paintTypes"
                            value={type}
                            id={`paint-${type}`}
                            className="form-check-input"
                            as="input"
                          />
                          <label
                            htmlFor={`paint-${type}`}
                            className="form-check-label"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                    {/* <ErrorMessage
                  name="paintTypes"
                  component={BootstrapForm.Control.Feedback"
                  type="invalid"
                /> */}
                  </BootstrapForm.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>
                      Location of Projects
                    </BootstrapForm.Label>
                    <BootstrapForm.Label className="d-block">
                      City/State:
                    </BootstrapForm.Label>
                    <Field
                      as={BootstrapForm.Control}
                      type="text"
                      name="cityState"
                      isInvalid={touched.cityState && !!errors.cityState}
                    />
                    <ErrorMessage
                      name="cityState"
                      component={BootstrapForm.Control.Feedback}
                      type="invalid"
                    />
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label className="d-block">
                      Do you work in multiple states?
                    </BootstrapForm.Label>
                    <div>
                      <div className="form-check">
                        <Field
                          type="radio"
                          name="worksMultipleStates"
                          id="worksMultipleStates-yes"
                          value={true}
                          className="form-check-input"
                          as="input"
                        />
                        <label
                          htmlFor="worksMultipleStates-yes"
                          className="form-check-label"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="form-check">
                        <Field
                          type="radio"
                          name="worksMultipleStates"
                          id="worksMultipleStates-no"
                          value={false}
                          className="form-check-input"
                          as="input"
                        />
                        <label
                          htmlFor="worksMultipleStates-no"
                          className="form-check-label"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </BootstrapForm.Group>

                  {values.worksMultipleStates && (
                    <BootstrapForm.Group className="mb-3">
                      <BootstrapForm.Label>
                        If yes, list them:
                      </BootstrapForm.Label>
                      <Field
                        as={BootstrapForm.Control}
                        type="text"
                        name="otherStates"
                      />
                    </BootstrapForm.Group>
                  )}
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  {" "}
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>
                      Additional Notes (Optional)
                    </BootstrapForm.Label>
                    <Field
                      as="textarea"
                      className="form-control"
                      rows={3}
                      name="additionalNotes"
                      placeholder='E.g., "Currently working on 5-unit estate project in Lekki," or "Interested in custom color options."'
                    />
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <div className="form-check">
                      <Field
                        type="checkbox"
                        name="partnerAgreement"
                        id="partnerAgreement"
                        className="form-check-input"
                        as="input"
                      />
                      <label
                        htmlFor="partnerAgreement"
                        className="form-check-label"
                      >
                        I&apos;m interested in becoming a Nexgen Paint Partner
                        and receiving exclusive rates and support.
                      </label>
                    </div>
                    {/* <ErrorMessage
                  name="partnerAgreement"
                  component={BootstrapForm.Control.Feedback"
                  type="invalid"
                /> */}
                  </BootstrapForm.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}></Col>
                <Col md={6}></Col>
              </Row>

              <div className="d-grid">
                <Button
                  type="submit"
                  variant="primary"
                  className="shadow bg-orange text-white"
                >
                  Submit Partnership Request
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default PartnershipModal;
