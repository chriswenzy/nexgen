import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Form as BootstrapForm, Button, Modal } from "react-bootstrap";
import { FiUploadCloud } from "react-icons/fi";
import Image from "next/image";
import { kycAsync } from "@/slices/auth/authSlice";
import { useDispatch } from "react-redux";
const KycModal = (props) => {
  const validationSchema = Yup.object().shape({
    utility_bill: Yup.mixed().required("Utility bill is required"),
    bvn: Yup.string().required("BVN is required"),
    nin: Yup.string().required("NIN is required"),
    dob: Yup.date().required("Date of Birth is required"),
  });
  const [updateProfile, setUpdateProfile] = useState(false);
  const [utilityBillBase64, setUtilityBillBase64] = useState("");

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFieldValue("utility_bill", reader.result);
        setUtilityBillBase64(reader.result);
      };
    }
  };

  const dispatch = useDispatch();

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        // dialogClassName="top-right-modal"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Your Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="my-3">
            Let’s make your experience truly yours! 🚀 Tell us a little about
            yourself—it’s quick, easy, and helps us serve you better!
          </p>

          <div>
            <Formik
              initialValues={{
                utility_bill: "",
                bvn: "",
                nin: "",
                dob: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                try {
                  const result = await dispatch(kycAsync({ values: values }));

                  if (kycAsync.fulfilled.match(result)) {
                    props?.onHide();
                  } else {
                    console.error("kyc failed:", result);
                  }
                } catch (error) {
                  console.error("An error occurred:", error);
                }
              }}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form as={BootstrapForm}>
                  <BootstrapForm.Group
                    controlId="utility_bill"
                    className="mb-3"
                  >
                    <BootstrapForm.Label>Utility Bill</BootstrapForm.Label>
                    <div
                      className="file-upload-container"
                      onClick={() =>
                        document.getElementById("fileUpload").click()
                      }
                    >
                      <input
                        id="fileUpload"
                        type="file"
                        className="d-none"
                        onChange={(event) =>
                          handleFileChange(event, setFieldValue)
                        }
                      />
                      <div className="file-upload-box">
                        <FiUploadCloud size={40} className="upload-icon" />
                        <span className="upload-text">
                          Click to upload utility bill
                        </span>
                      </div>
                    </div>
                    {touched.utility_bill && errors.utility_bill && (
                      <div className="text-danger">{errors.utility_bill}</div>
                    )}
                    {utilityBillBase64 && (
                      <div className="uploaded-image-preview mt-3">
                        <Image
                          src={utilityBillBase64}
                          alt="Uploaded Preview"
                          className="img-fluid"
                          width={500}
                          height={500}
                        />
                      </div>
                    )}
                  </BootstrapForm.Group>

                  <BootstrapForm.Group controlId="bvn" className="mb-3">
                    <BootstrapForm.Label>BVN</BootstrapForm.Label>
                    <Field
                      name="bvn"
                      as={BootstrapForm.Control}
                      isInvalid={touched.bvn && errors.bvn}
                      placeholder="Enter BVN"
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {errors.bvn}
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group controlId="nin" className="mb-3">
                    <BootstrapForm.Label>NIN</BootstrapForm.Label>
                    <Field
                      name="nin"
                      as={BootstrapForm.Control}
                      isInvalid={touched.nin && errors.nin}
                      placeholder="Enter NIN"
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {errors.nin}
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group controlId="dob" className="mb-3">
                    <BootstrapForm.Label>Date of Birth</BootstrapForm.Label>
                    <Field
                      name="dob"
                      as={BootstrapForm.Control}
                      isInvalid={touched.dob && errors.dob}
                      type="date"
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {errors.dob}
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <Button type="submit" variant="primary" className="w-100">
                    Update KYC
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default KycModal;
