import PublicLayout from "@/components/layout/public-layout";
import {
  Distributorbenefits,
  eligibleApplicants,
  productRange,
  steps,
} from "@/util/data";
import Image from "next/image";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Badge,
  CardBody,
  ListGroupItem,
} from "react-bootstrap";
import {
  BsLightning,
  BsTag,
  BsTruck,
  BsMegaphone,
  BsGraphUp,
  BsCheckCircle,
  BsTelephone,
} from "react-icons/bs";

const Distributorpage = () => {
  return (
    <PublicLayout>
      <div className="distributor-page">
        {/* Hero Section */}
        <section className="py-5 py-lg-7 bg-dark text-white position-relative">
          <div className="position-absolute top-0 end-0 w-50 h-100 bg-primary opacity-10"></div>
          <Container>
            <Row className="align-items-center">
              <Col lg={6} className="mb-5 mb-lg-0">
                <Badge pill bg="light" text="dark" className="mb-3">
                  DISTRIBUTOR OPPORTUNITY
                </Badge>
                <h1 className="display-4 fw-bold mb-4">
                  Become a <span className="text-warning">Nexgen Paint</span>{" "}
                  Distributor
                </h1>
                <p className="lead mb-5">
                  Join our expanding network and earn great margins with
                  Nigeria&apos;s fastest-growing paint brand.
                </p>
                <Button
                  variant="warning"
                  size="lg"
                  className="rounded-pill px-4"
                >
                  Apply Now
                </Button>
              </Col>
              <Col lg={6}>
                <div className="rounded-4 overflow-hidden shadow-lg">
                  <Image
                    src="/distributor-hero.jpg"
                    alt="Happy distributor"
                    width={600}
                    height={400}
                    layout="responsive"
                    priority
                    className="img-fluid"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Why Sell Section */}
        <section className="py-5 py-lg-7">
          <Container>
            <Row className="justify-content-center mb-5">
              <Col lg={8} className="text-center">
                <h2 className="display-5 fw-bold mb-3">
                  Why Sell <span className="text-primary">Nexgen Paint</span>?
                </h2>
                <p className="lead text-muted">
                  Partner with a brand trusted by professionals, builders, and
                  homeowners nationwide.
                </p>
              </Col>
            </Row>

            <Row className="g-4">
              {Distributorbenefits.map((benefit, index) => (
                <Col key={index} md={6} lg={4} className="mb-4">
                  <Card className="h-100 border-0 shadow-sm">
                    <CardBody className="p-4">
                      <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle p-3 mb-4">
                        {benefit.icon}
                      </div>
                      <h5 className="mb-3">{benefit.title}</h5>
                      <p className="text-muted mb-0">{benefit.description}</p>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Product Range */}
        <section className="py-5 bg-light">
          <Container>
            <Row className="justify-content-center mb-5">
              <Col lg={8} className="text-center">
                <h2 className="display-5 fw-bold mb-3">
                  Our <span className="text-primary">Product Range</span>{" "}
                  Includes:
                </h2>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={8}>
                <Card className="border-0 shadow-sm">
                  <CardBody className="p-4">
                    <ListGroup variant="flush">
                      {productRange.map((product, index) => (
                        <ListGroupItem
                          key={index}
                          className="d-flex align-items-center border-0 py-3"
                        >
                          <BsCheckCircle className="text-primary me-3" />
                          {product}
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Who Can Apply */}
        <section className="py-5 py-lg-7">
          <Container>
            <Row className="g-4">
              <Col lg={6}>
                <Card className="h-100 border-0 shadow-sm">
                  <CardBody className="p-4">
                    <h2 className="mb-4">Who Can Apply?</h2>
                    <ListGroup as="ul" variant="flush">
                      {eligibleApplicants.map((applicant, index) => (
                        <ListGroupItem
                          as="li"
                          key={index}
                          className="border-0 py-2"
                        >
                          {applicant}
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={6}>
                <Card className="h-100 border-0 shadow-sm">
                  <CardBody className="p-4">
                    <h2 className="mb-4">How to Become a Distributor</h2>
                    <div className="steps">
                      {steps.map((step, index) => (
                        <div key={index} className="d-flex mb-4">
                          <div className="step-number bg-primary text-white rounded-circle me-3">
                            {index + 1}
                          </div>
                          <div>
                            <h5 className="mb-1">Step {index + 1}</h5>
                            <p className="mb-0 text-muted">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="primary"
                      className="mt-3 rounded-pill px-4"
                    >
                      Begin Application
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="py-5 py-lg-7 bg-primary text-white text-center">
          <Container>
            <h2 className="display-5 fw-bold mb-4">
              Join a Brand Committed to Your Success
            </h2>
            <p className="lead mb-5 mx-auto" style={{ maxWidth: "600px" }}>
              At Nexgen Paint, we don&apos;t just sell paint — we build
              long-term business relationships.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Button
                variant="light"
                size="lg"
                className="rounded-pill px-5 fw-bold"
              >
                Apply to Become a Distributor
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                className="rounded-pill px-4"
              >
                <BsTelephone className="me-2" />
                +234-XXX-XXXX
              </Button>
            </div>
          </Container>
        </section>
      </div>
    </PublicLayout>
  );
};

export default Distributorpage;
