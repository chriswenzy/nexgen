import ContactUsForm from "@/components/form/contact-us-form";
import PublicLayout from "@/components/layout/public-layout";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  CardBody,
  FormGroup,
} from "react-bootstrap";
import {
  BsTelephone,
  BsEnvelope,
  BsClock,
  BsHeadset,
  BsTruck,
} from "react-icons/bs";
import { FaHandshakeSimple } from "react-icons/fa6";
import { MdOutlineSupportAgent } from "react-icons/md";
const ContactUs = () => {
  return (
    <PublicLayout>
      <div className="contact-page">
        {/* Hero Section */}
        <section className=" py-5 py-lg-7 bg-blue text-white position-relative">
          <Container>
            <Row className="justify-content-center text-center">
              <Col lg={8}>
                <h1 className="display-4 fw-bold mb-4">Contact Us</h1>
                <p className="lead mb-0">We&apos;re Just a Message Away!</p>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Contact Methods */}
        <section className="py-5 py-lg-7">
          <Container>
            <Row className="g-4">
              {/* Phone */}
              <Col md={6} lg={4}>
                <Card className="h-100 border-0 shadow-sm text-center contact-card">
                  <CardBody className="p-4">
                    <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle p-3 mb-4 mx-auto">
                      <BsTelephone size={32} className="text-color-2" />
                    </div>
                    <h3 className="h4 mb-3">Phone</h3>
                    <a
                      href="https://wa.me/2349067966435"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fs-4 fw-bold text-color-3 mb-1 text-decoration-none"
                    >
                      +234 906 796 6435
                    </a>

                    <p className="text-muted">
                      <BsClock className="me-2" />
                      Mon – Sat, 9am to 6pm
                    </p>
                  </CardBody>
                </Card>
              </Col>

              {/* General Email */}
              <Col md={6} lg={4}>
                <Card className="h-100 border-0 shadow-sm text-center contact-card">
                  <CardBody className="p-4">
                    <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle p-3 mb-4 mx-auto">
                      <BsEnvelope size={32} className="text-color-2" />
                    </div>
                    <h3 className="h4 mb-3">Email</h3>
                    <p className="fs-5 fw-bold text-color-3 mb-1">
                      info@nexgenpaint.com
                    </p>
                    <p className="text-muted">
                      <BsHeadset className="me-2" />
                      General inquiries & support
                    </p>
                  </CardBody>
                </Card>
              </Col>

              {/* Other Emails */}
              <Col md={6} lg={4}>
                <Card className="h-100 border-0 shadow-sm text-center contact-card">
                  <CardBody className="p-4">
                    <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle p-3 mb-4 mx-auto">
                      <MdOutlineSupportAgent
                        size={32}
                        className="text-color-2"
                      />
                    </div>
                    <h3 className="h4 mb-3">Specialized Support</h3>
                    <div className="mb-3">
                      <p className="fw-bold mb-1">orders@nexgenpaint.com</p>
                      <small className="text-muted">
                        <BsTruck className="me-1" />
                        Orders & Delivery
                      </small>
                    </div>
                    <div>
                      <p className="fw-bold mb-1">partners@nexgenpaint.com</p>
                      <small className="text-muted">
                        <FaHandshakeSimple className="me-1" />
                        Distributor/Partnership
                      </small>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Contact Form */}
        <section className="py-5 py-lg-7 bg-light">
          <Container>
            <Row className="justify-content-center">
              <Col lg={12}>
                <Card className="border-0">
                  <CardBody className="p-4 p-lg-5">
                    <h2 className="text-center mb-5 text-color-3 fw-bold">
                      Send Us a Message
                    </h2>
                    <ContactUsForm />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Map/Location Section */}
        <section className="py-5">
          <Container>
            <Row className="justify-content-center mb-4">
              <Col lg={8} className="text-center">
                <h2 className="mb-4 text-color-3 fw-bold ">Visit Our Office</h2>
                <p className=" text-muted">
                  12 Industrial Road, Lagos Mainland, Lagos, Nigeria
                </p>
              </Col>
            </Row>
            <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.123456789012!2d3.1234567890123456!3d6.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDcnMjIuNCJOIDPCsDA3JzI0LjgiRQ!5e0!3m2!1sen!2sng!4v1234567890123!5m2!1sen!2sng"
                allowFullScreen
                loading="lazy"
                title="Nexgen Paint Location"
              ></iframe>
            </div>
          </Container>
        </section>
      </div>
    </PublicLayout>
  );
};

export default ContactUs;
