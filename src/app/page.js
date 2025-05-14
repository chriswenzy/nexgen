import Image from "next/image";
import PublicLayout from "@/components/layout/public-layout";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import {
  BsAward,
  BsDroplet,
  BsPlayCircle,
  BsShieldCheck,
} from "react-icons/bs";
import heroImg from "../assets/paint-splash.jpg";
import productImg from "../assets/paint-featured.jpg";
import { BsTree, BsGem, BsPeople } from "react-icons/bs";
import aboutImg from "../assets/colorful-about.jpg";
import aboutImg2 from "../assets/paint-pen.jpg";
export default function Home() {
  return (
    <PublicLayout>
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
                  src={productImg}
                  alt="Nexgen Premium Paint"
                  width={600}
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
      </section>

      <section
        className="position-relative py-5 py-lg-8"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        {/* Decorative elements */}
        <div
          className="position-absolute top-0 end-0 w-50 h-100 bg-light"
          style={{ zIndex: 0 }}
        />
        <div
          className="position-absolute bottom-0 start-0"
          style={{ zIndex: 0 }}
        >
          <Image
            src={aboutImg}
            alt="Decorative paint splash"
            width={300}
            height={200}
            fluid
            style={{ width: "300px", opacity: 0.15 }}
          />
        </div>

        <Container>
          <Row className="align-items-center">
            {/* Visual Storytelling Column */}
            <Col lg={6} className="mb-5 mb-lg-0 position-relative">
              <div className="position-relative">
                <Card className="border-0 shadow-lg overflow-hidden">
                  <Image
                    src={aboutImg2}
                    alt="Nexgen team working"
                    fluid
                    width={200}
                    height={200}
                  />
                </Card>

                <Card
                  className="position-absolute bottom-0 start-0 bg-warning p-4 rounded-3 shadow-sm"
                  style={{
                    transform: "translate(-20%, -20%)",
                    width: "75%",
                    zIndex: 1,
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div className="bg-white rounded-circle p-3 me-3 shadow">
                      <BsAward size={32} className="text-warning" />
                    </div>
                    <div>
                      <h3 className="mb-0">12+</h3>
                      <p className="small mb-0">Industry Awards</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Founder's Note */}
              <Card className="bg-white p-4 rounded-3 shadow mt-5 border-start border-5 border-warning">
                <div className="d-flex">
                  <Image
                    src={aboutImg2}
                    alt="Founder"
                    width={80}
                    height={80}
                    roundedCircle
                    style={{
                      objectFit: "cover",
                    }}
                    className="me-3"
                  />
                  <div>
                    <blockquote className="mb-2 fst-italic">
                      We don&apos;t just sell paint, we sell lasting beauty and
                      protection for what matters most.
                    </blockquote>
                    <div>
                      <h6 className="mb-0">Adebayo Johnson</h6>
                      <p className="small text-muted mb-0">Founder & CEO</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Content Column */}
            <Col lg={6} className="ps-lg-5">
              <div className="mb-4">
                <Badge
                  pill
                  bg="warning"
                  className="text-warning bg-opacity-10 px-3 py-2 mb-3"
                >
                  OUR STORY
                </Badge>
                <h2 className="display-5 fw-bold mb-4">
                  Revolutionizing{" "}
                  <span className="text-warning">African Homes</span> Since 2010
                </h2>
                <p className="lead">
                  What started as a small Lagos paint shop has grown into
                  Nigeria`&apos`s most trusted paint brand, transforming over
                  50,000 spaces with our premium formulations.
                </p>
              </div>

              {/* Key Differentiators */}
              <Row className="g-4 mb-5">
                <Col md={6}>
                  <div className="d-flex">
                    <div className="bg-warning bg-opacity-10 p-3 rounded-3 me-3">
                      <BsDroplet size={24} className="text-warning" />
                    </div>
                    <div>
                      <h5 className="mb-2">Advanced Formulation</h5>
                      <p className="small text-muted mb-0">
                        German-engineered technology adapted for African
                        climates
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex">
                    <div className="bg-warning bg-opacity-10 p-3 rounded-3 me-3">
                      <BsTree size={24} className="text-warning" />
                    </div>
                    <div>
                      <h5 className="mb-2">Eco-Conscious</h5>
                      <p className="small text-muted mb-0">
                        Zero VOC paints that are safe for children and pets
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex">
                    <div className="bg-warning bg-opacity-10 p-3 rounded-3 me-3">
                      <BsGem size={24} className="text-warning" />
                    </div>
                    <div>
                      <h5 className="mb-2">Premium Quality</h5>
                      <p className="small text-muted mb-0">
                        Twice the durability of standard market paints
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex">
                    <div className="bg-warning bg-opacity-10 p-3 rounded-3 me-3">
                      <BsPeople size={24} className="text-warning" />
                    </div>
                    <div>
                      <h5 className="mb-2">Community Focus</h5>
                      <p className="small text-muted mb-0">
                        Training local painters and creating jobs nationwide
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* CTA */}
              <div className="d-flex flex-wrap gap-3">
                <Button
                  variant="warning"
                  size="lg"
                  className="rounded-pill px-4"
                >
                  Meet Our Team
                </Button>
                <Button
                  variant="outline-dark"
                  size="lg"
                  className="rounded-pill px-4"
                >
                  <BsPlayCircle className="me-2" />
                  Watch Our Story
                </Button>
              </div>
            </Col>
          </Row>

          {/* Milestones */}
          <Row className="mt-5 g-4">
            <Col md={3} className="text-center">
              <div className="display-4 fw-bold text-warning mb-2">14</div>
              <h5 className="mb-0">Years Experience</h5>
              <p className="small text-muted">Perfecting our craft</p>
            </Col>
            <Col md={3} className="text-center">
              <div className="display-4 fw-bold text-warning mb-2">50K+</div>
              <h5 className="mb-0">Projects</h5>
              <p className="small text-muted">Across West Africa</p>
            </Col>
            <Col md={3} className="text-center">
              <div className="display-4 fw-bold text-warning mb-2">200+</div>
              <h5 className="mb-0">Team Members</h5>
              <p className="small text-muted">Passionate experts</p>
            </Col>
            <Col md={3} className="text-center">
              <div className="display-4 fw-bold text-warning mb-2">15</div>
              <h5 className="mb-0">Innovation Awards</h5>
              <p className="small text-muted">Industry recognition</p>
            </Col>
          </Row>
        </Container>
      </section>
    </PublicLayout>
  );
}
