import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updatePropertyByIdAsync } from "../../slices/property/propertySlice";
const PropertyStatusModal = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirm Status Update
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <small>
              Are you sure you want to mark this property as sold? This will
              update its status and notify relevant customers
            </small>
          </div>

          <div>
            <Formik
              initialValues={{
                status: "",
                renter_full_name: "",
                rental_period_start: "",
                rental_period_end: "",
                buyer_full_name: "",
                sale_date: "",
              }}
              validationSchema={Yup.object().shape({
                status: Yup.string().required("Status is required"),
                // renter_full_name: Yup.string().when("status", {
                //   is: "RNT",
                //   then: Yup.string().required("Renter's Name is required"),
                // }),
                // rental_period_start: Yup.date().when("status", {
                //   is: "RNT",
                //   then: Yup.date().required("Rent Start Date is required"),
                // }),
                // rental_period_end: Yup.date().when("status", {
                //   is: "RNT",
                //   then: Yup.date().required("Rent End Date is required"),
                // }),
                // buyer_full_name: Yup.string().when("status", {
                //   is: "SOLD",
                //   then: Yup.string().required("Buyer's Name is required"),
                // }),
                // sale_date: Yup.date().when("status", {
                //   is: "SOLD",
                //   then: Yup.date().required("Sale Date is required"),
                // }),
              })}
              onSubmit={async (values) => {
                // Filter out empty fields
                const filteredValues = Object.keys(values).reduce(
                  (acc, key) => {
                    if (
                      values[key] !== "" &&
                      values[key] !== null &&
                      values[key] !== undefined
                    ) {
                      acc[key] = values[key];
                    }
                    return acc;
                  },
                  {}
                );

                try {
                  // Dispatch the action with the filtered payload
                  const result = await dispatch(
                    updatePropertyByIdAsync({
                      property_id: props?.data?.id,
                      values: filteredValues, // Use filteredValues here
                    })
                  );

                  // Handle the result of the asyncThunk
                  if (updatePropertyByIdAsync.fulfilled.match(result)) {
                    console.log("Update successful:", result.payload);

                    // Perform any additional actions after success
                    // Example: sessionStorage.setItem("email", filteredValues.email);
                    // navigate("/confirm-email");
                  } else {
                    console.error("Update failed:", result.error.message);
                  }
                } catch (error) {
                  console.error(
                    "An unexpected error occurred during update:",
                    error
                  );
                }
              }}
            >
              {({
                errors,
                touched,
                handleSubmit,
                values,
                handleChange,
                handleBlur,
              }) => (
                <Form onSubmit={handleSubmit}>
                  {/* Status Selection */}
                  <Form.Group className="mb-4">
                    <Form.Label>Reason for marking?</Form.Label>
                    <Form.Select
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      isInvalid={touched.status && errors.status}
                    >
                      <option value="">Select Reason</option>
                      <option value="SOLD">Sold to a Buyer</option>
                      <option value="RNT">Rented</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.status}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Conditional Fields for "SOLD" */}
                  {values.status === "SOLD" && (
                    <>
                      <Form.Group className="mb-4">
                        <Form.Label>Buyer's Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter buyer's name"
                          name="buyer_full_name"
                          value={values.buyer_full_name}
                          onChange={handleChange}
                          isInvalid={
                            touched.buyer_full_name && errors.buyer_full_name
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.buyer_full_name}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Sale Date</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="Select sale date"
                          name="sale_date"
                          value={values.sale_date}
                          onChange={handleChange}
                          isInvalid={touched.sale_date && errors.sale_date}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.sale_date}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </>
                  )}

                  {/* Conditional Fields for "RNT" */}
                  {values.status === "RNT" && (
                    <>
                      <Form.Group className="mb-4">
                        <Form.Label>Renter's Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter renter's name"
                          name="renter_full_name"
                          value={values.renter_full_name}
                          onChange={handleChange}
                          isInvalid={
                            touched.renter_full_name && errors.renter_full_name
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.renter_full_name}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <h6>Rent Period</h6>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-4">
                            <Form.Label>From</Form.Label>
                            <Form.Control
                              type="date"
                              placeholder="Start date"
                              name="rental_period_start"
                              value={values.rental_period_start}
                              onChange={handleChange}
                              isInvalid={
                                touched.rental_period_start &&
                                errors.rental_period_start
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.rental_period_start}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-4">
                            <Form.Label>To</Form.Label>
                            <Form.Control
                              type="date"
                              placeholder="End date"
                              name="rental_period_end"
                              value={values.rental_period_end}
                              onChange={handleChange}
                              isInvalid={
                                touched.rental_period_end &&
                                errors.rental_period_end
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.rental_period_end}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                    </>
                  )}

                  {/* Submit and Cancel Buttons */}
                  <Row>
                    <Col md={6}>
                      <Button
                        onClick={() => props.onHide()}
                        variant="light"
                        className="w-100"
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
                        Confirm
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default PropertyStatusModal;
