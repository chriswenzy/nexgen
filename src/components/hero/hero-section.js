"use client";

import Image from "next/image";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BsPlayCircle, BsShieldCheck } from "react-icons/bs";
import heroImg from "../../assets/paint-splash.jpg";

const HeroSection = () => {
  return;
  <section className="hero-section position-relative overflow-hidden">
    <div className="position-absolute w-100 h-100 bg-dark opacity-25"></div>
    <Image
      src={heroImg}
      alt="Beautiful home with Nexgen paint"
      fill
      className="object-cover"
      priority
    />

    <Container className="position-relative z-index-1">
      <Row className="min-vh-90 align-items-center py-5">
        <Col lg={7} className="py-5">
          {/* Trust Badges */}
          <div className="d-flex gap-3 mb-4 align-items-center">
            <div className="badge bg-white text-dark rounded-pill px-3 py-2 small fw-bold">
              🏆 #1 Rated in Nigeria
            </div>
            <div className="text-white">
              <span className="fw-bold">4.9</span> ★★★★★ (2,483 reviews)
            </div>
          </div>

          {/* Headline with value proposition */}
          <h1 className="display-4 fw-bold text-white mb-4">
            Premium Paint That{" "}
            <span className="text-warning">Lasts 2X Longer</span>
            <br />
            Than Ordinary Brands
          </h1>

          {/* Benefit bullets */}
          <ul className="text-white list-unstyled mb-5 fs-5">
            <li className="mb-3 d-flex align-items-center">
              <span className="icon-check-circle me-3 fs-4 text-warning"></span>
              Fade-resistant technology stays vibrant for years
            </li>
            <li className="mb-3 d-flex align-items-center">
              <span className="icon-check-circle me-3 fs-4 text-warning"></span>
              One-coat coverage saves time and money
            </li>
            <li className="d-flex align-items-center">
              <span className="icon-check-circle me-3 fs-4 text-warning"></span>
              Eco-friendly formula, safe for families
            </li>
          </ul>

          {/* CTA Section */}
          <div className="d-flex flex-wrap gap-4 align-items-center">
            <Button
              variant="warning"
              size="lg"
              className="rounded-pill px-5 py-3 fw-bold shadow-lg hover-transform"
            >
              Get Free Color Consultation →
            </Button>

            <div className="d-flex align-items-center text-white">
              <div className="me-3">
                <BsPlayCircle size={36} className="text-warning" />
              </div>
              <div>
                <div className="small">See how it works</div>
                <div className="fw-bold">2-Minute Demo</div>
              </div>
            </div>
          </div>
        </Col>

        {/* Product showcase - right side */}
        <Col lg={5} className="d-none d-lg-block">
          <div className="paint-can-card bg-white rounded-4 p-4 shadow-lg position-relative">
            <div className="position-absolute top-0 start-50 translate-middle">
              <div className="bg-danger text-white small px-3 py-2 rounded-pill fw-bold">
                🔥 35% OFF Today Only
              </div>
            </div>
            <Image
              src="/premium-paint-can.png"
              alt="Nexgen Premium Paint"
              width={400}
              height={400}
              className="img-fluid"
            />
            <div className="text-center mt-3">
              <div className="h4 fw-bold mb-1">Nexgen Elite Series</div>
              <div className="d-flex justify-content-center gap-2 mb-3">
                <span className="text-decoration-line-through text-muted">
                  ₦24,999
                </span>
                <span className="h5 fw-bold text-danger">₦16,249</span>
              </div>
              <Button
                variant="dark"
                size="lg"
                className="w-100 rounded-pill py-3"
              >
                Add to Cart
              </Button>
              <div className="small text-muted mt-2">
                <BsShieldCheck className="text-success me-2" />
                2-Year Warranty Included
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>

    {/* Trust indicators at bottom */}
    <div className="position-absolute bottom-0 w-100 bg-white py-3">
      <Container>
        <Row className="g-4 text-center">
          <Col xs={6} md={3}>
            <div className="h3 fw-bold text-primary mb-1">10K+</div>
            <div className="small">Happy Customers</div>
          </Col>
          <Col xs={6} md={3}>
            <div className="h3 fw-bold text-primary mb-1">15</div>
            <div className="small">Years Warranty</div>
          </Col>
          <Col xs={6} md={3}>
            <div className="h3 fw-bold text-primary mb-1">100%</div>
            <div className="small">Satisfaction Guarantee</div>
          </Col>
          <Col xs={6} md={3}>
            <div className="h3 fw-bold text-primary mb-1">24/7</div>
            <div className="small">Expert Support</div>
          </Col>
        </Row>
      </Container>
    </div>
  </section>;
};

export default HeroSection;
