"use client";
import PublicLayout from "@/components/layout/public-layout";
import Image from "next/image";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Badge,
  CardBody,
  ListGroupItem,
} from "react-bootstrap";
import {
  BsCheckCircle,
  BsTruck,
  BsHeadset,
  BsBrush,
  BsPalette,
  BsBuilding,
  BsShieldCheck,
} from "react-icons/bs";
import aboutImg2 from "../../assets/paint-brush-4.jpg";
import { benefits, partnerCategories, partnerTypes } from "@/util/data";
import PartnershipModal from "@/components/modal/partnership-modal";
import { useState } from "react";

const Partner = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <PublicLayout show={showModal} onHide={() => setShowModal(false)}>
      <PartnershipModal />
      <div className="partnerships-page">
        {/* Hero Section */}
        <section className="py-5 py-lg-7 bg-dark text-white position-relative">
          <div className="position-absolute top-0 end-0 w-50  bg-primary opacity-10"></div>
          <Container>
            <Row className="align-items-center">
              <Col lg={6} className="mb-5 mb-lg-0">
                <Badge pill bg="light" text="dark" className="mb-3">
                  PARTNER WITH US
                </Badge>
                <h1 className="display-4 fw-bold mb-4">
                  Nexgen{" "}
                  <span className="text-color-2">
                    Construction Partnerships
                  </span>
                </h1>
                <p className="mb-5">
                  Your Projects. Our Paint. One Powerful Collaboration.
                </p>
                <Button
                  variant="warning"
                  size="md"
                  className="rounded-pill px-4"
                >
                  Apply to Become a Partner
                </Button>
              </Col>
              <Col lg={6}>
                <div className="rounded-4 overflow-hidden shadow-lg">
                  <Image
                    src={aboutImg2}
                    width={500}
                    height={500}
                    // fluid
                    layout="responsive"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL={aboutImg2.src}
                    quality={80}
                    priority
                    alt="Construction team working"
                    className="img-fluid"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Partnership Benefits */}
        <section className="py-5 py-lg-7">
          <Container>
            <Row className="justify-content-center mb-5">
              <Col lg={8} className="text-center">
                <h2 className="display-5 fw-bold mb-3">
                  Why Partner with{" "}
                  <span className="text-color-2">Nexgen Paint</span>?
                </h2>
                <p className=" text-muted">
                  Whether you&apos;re working on a private residence, commercial
                  complex, or entire estate, we provide the right products and
                  reliable delivery.
                </p>
              </Col>
            </Row>

            <Row className="g-4">
              {benefits.map((benefit, index) => (
                <Col key={index} md={6} lg={4}>
                  <Card className="h-100 border-0 shadow-sm benefit-card">
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

        {/* Product Categories */}
        <section className="py-5 bg-light">
          <Container>
            <Row className="justify-content-center mb-4">
              <Col lg={8} className="text-center">
                <h2 className="display-5 fw-bold mb-3">
                  Partner-Approved{" "}
                  <span className="text-color-2">Product Categories</span>
                </h2>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={8}>
                <Card className="border-0 shadow-sm">
                  <CardBody className="p-4">
                    <ListGroup variant="flush">
                      {partnerCategories.map((category, index) => (
                        <ListGroupItem
                          key={index}
                          className="d-flex align-items-center border-0 py-3"
                        >
                          <BsCheckCircle className="text-color-4 me-3" />
                          {category}
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Partner Types */}
        <section className="py-5 py-lg-7">
          <Container>
            <Row className="justify-content-center mb-5">
              <Col lg={8} className="text-center">
                <h2 className="display-5 fw-bold mb-3">
                  Who We <span className="text-color-2">Partner With</span>
                </h2>
                <p className="text-muted">
                  Nexgen Paint gives you pricing that protects your margins so
                  you can focus on delivering exceptional results.
                </p>
              </Col>
            </Row>

            <Row className="g-4">
              {partnerTypes.map((partner, index) => (
                <Col key={index} md={6} lg={3}>
                  <Card className="h-100 border-0 shadow-sm">
                    <CardBody className="p-4 text-center">
                      <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle p-3 mb-4 mx-auto">
                        {index === 0 && (
                          <BsBrush size={24} className="text-color-1" />
                        )}
                        {index === 1 && (
                          <BsBuilding size={24} className="text-color-1" />
                        )}
                        {index === 2 && (
                          <BsBuilding size={24} className="text-color-1" />
                        )}
                        {index === 3 && (
                          <BsPalette size={24} className="text-color-1" />
                        )}
                      </div>
                      <h5 className="mb-3">{partner.title}</h5>
                      <p className="text-muted mb-0">{partner.description}</p>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="py-5 py-lg-7 bg-blue text-white text-center">
          <Container>
            <h2 className="display-5 fw-bold mb-4">
              Ready to unlock smarter sourcing?
            </h2>
            <p className="lead mb-5 mx-auto" style={{ maxWidth: "600px" }}>
              Get better pricing, reliable paint solutions, and partnership
              benefits.
            </p>
            <Button
              variant="light"
              size="md"
              className="rounded-pill px-5 fw-bold"
              onClick={() => setShowModal(true)}
            >
              Apply to Become a Partner
            </Button>
          </Container>
        </section>
      </div>
    </PublicLayout>
  );
};

export default Partner;
