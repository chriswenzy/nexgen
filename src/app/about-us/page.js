import PublicLayout from "@/components/layout/public-layout";
import Image from "next/image";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";

import {
  BsCheckCircle,
  BsStarFill,
  BsTruck,
  BsPalette,
  BsShieldCheck,
  BsBuilding,
  BsHeadset,
} from "react-icons/bs";
import aboutImg2 from "../../assets/paint-pen.jpg";

const AboutUs = () => {
  return (
    <PublicLayout>
      <div className="about-page">
        {/* Hero Section */}
        <section className="hero-section py-5 py-lg-7 bg-dark text-white position-relative">
          <div className="position-absolute top-0 end-0 w-50 h-100 bg-primary opacity-10"></div>
          <Container>
            <Row className="align-items-center">
              <Col lg={6} className="mb-5 mb-lg-0">
                <Badge pill bg="warning" className="mb-3 text-dark">
                  OUR STORY
                </Badge>
                <h1 className="display-4 fw-bold mb-4">
                  Redefining <span className="text-warning">Paint Quality</span>{" "}
                  in Africa
                </h1>
                <p className="lead mb-5">
                  Born from a passion to transform spaces, Nexgen Paint brings
                  world-class solutions to homes and businesses across Nigeria.
                </p>
                <Button
                  variant="warning"
                  size="lg"
                  className="rounded-pill px-4 py-3 fw-bold"
                >
                  Book Free Consultation
                </Button>
              </Col>
              <Col lg={6}>
                <div className="rounded-4 overflow-hidden shadow-lg">
                  <Image
                    src={aboutImg2}
                    alt="Nexgen team working"
                    // fluid
                    className="img-fluid"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Mission & Vision */}
        <section className="py-5 py-lg-7 bg-light">
          <Container>
            <Row className="g-4">
              <Col md={6}>
                <Card className="h-100 border-0 bg-white shadow-sm p-4">
                  <div
                    className="icon-wrapper bg-primary bg-opacity-10 rounded-circle p-3 mb-4"
                    style={{ width: "60px" }}
                  >
                    <BsStarFill size={24} className="text-primary" />
                  </div>
                  <h3 className="mb-3">Our Mission</h3>
                  <p className="mb-0">
                    To provide high-quality, durable, and affordable paint
                    solutions that enhance environments, and stand the test of
                    time.
                  </p>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="h-100 border-0 bg-white shadow-sm p-4">
                  <div
                    className="icon-wrapper bg-warning bg-opacity-10 rounded-circle p-3 mb-4"
                    style={{ width: "60px" }}
                  >
                    <BsBuilding size={24} className="text-warning" />
                  </div>
                  <h3 className="mb-3">Our Vision</h3>
                  <p className="mb-0">
                    To become Africa&apos;s most trusted paint brand,
                    transforming millions of spaces with innovative color
                    solutions.
                  </p>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Why Choose Us */}
        <section className="py-5 py-lg-7">
          <Container>
            <Row className="justify-content-center mb-5">
              <Col lg={8} className="text-center">
                <h2 className="display-5 fw-bold mb-3">
                  Why <span className="text-primary">Choose Nexgen</span> Paint?
                </h2>
                <p className="lead text-muted">
                  We solve the paint problems you&apos;ve been struggling with
                </p>
              </Col>
            </Row>

            <Row className="g-4">
              <Col md={6} lg={4}>
                <div className="d-flex">
                  <div className="me-4 text-primary">
                    <BsPalette size={32} />
                  </div>
                  <div>
                    <h5 className="mb-3">Precision Color Matching</h5>
                    <p className="text-muted mb-0">
                      What you choose is what you get - vibrant colors with
                      guaranteed consistency.
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="d-flex">
                  <div className="me-4 text-primary">
                    <BsShieldCheck size={32} />
                  </div>
                  <div>
                    <h5 className="mb-3">Durability You Can Trust</h5>
                    <p className="text-muted mb-0">
                      Our formulas are built for performance - rain or shine.
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="d-flex">
                  <div className="me-4 text-primary">
                    <BsBuilding size={32} />
                  </div>
                  <div>
                    <h5 className="mb-3">Designed for All Spaces</h5>
                    <p className="text-muted mb-0">
                      Whether it&apos;s your bedroom or warehouse - we have
                      paint for every surface.
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="d-flex">
                  <div className="me-4 text-primary">
                    <BsTruck size={32} />
                  </div>
                  <div>
                    <h5 className="mb-3">Nationwide Delivery</h5>
                    <p className="text-muted mb-0">
                      From Lagos to every part of Nigeria, we deliver quickly
                      and securely.
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="d-flex">
                  <div className="me-4 text-primary">
                    <BsHeadset size={32} />
                  </div>
                  <div>
                    <h5 className="mb-3">Expert Support</h5>
                    <p className="text-muted mb-0">
                      Get guidance on paint selection, quantities, and finishes
                      - free consultation.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Social Proof */}
        <section className="py-5 py-lg-7 bg-light">
          <Container>
            <Row className="align-items-center">
              <Col lg={6} className="mb-5 mb-lg-0">
                <h2 className="display-5 fw-bold mb-4">
                  Join the <span className="text-primary">Nexgen Movement</span>
                </h2>
                <p className="lead mb-4">
                  Thousands of homeowners, contractors, and real estate
                  developers trust Nexgen Paint to bring their spaces to life.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    className="rounded-pill px-4"
                  >
                    Book Free Consultation
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="lg"
                    className="rounded-pill px-4"
                  >
                    View Our Projects
                  </Button>
                </div>
              </Col>
              <Col lg={6}>
                <Card className="border-0 shadow">
                  <div className="p-4">
                    <div className="d-flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <BsStarFill key={star} className="text-warning me-1" />
                      ))}
                      <span className="ms-2 fw-bold">4.9/5</span>
                    </div>
                    <blockquote className="mb-4 fs-5">
                      Nexgen&apos;s premium matte finish transformed our home.
                      After 3 years, the colors still look as vibrant as day
                      one. Worth every naira!
                    </blockquote>
                    <div className="d-flex align-items-center">
                      <Image
                        src={aboutImg2}
                        width={60}
                        height={60}
                        className="me-3 object-fit-cover"
                        alt="Happy customer"
                      />
                      <div>
                        <h6 className="mb-0">Amina Yusuf</h6>
                        <small className="text-muted">Lagos Homeowner</small>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="py-5 py-lg-7 bg-primary text-white text-center">
          <Container>
            <h2 className="display-5 fw-bold mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="lead mb-5 mx-auto" style={{ maxWidth: "600px" }}>
              Experience the Nexgen difference with our premium paints and
              expert color consultation.
            </p>
            <Button
              variant="light"
              size="lg"
              className="rounded-pill px-5 py-3 fw-bold"
            >
              Get Started Today
            </Button>
          </Container>
        </section>
      </div>
    </PublicLayout>
  );
};

export default AboutUs;
