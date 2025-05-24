import Image from "next/image";
import PublicLayout from "@/components/layout/public-layout";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import {
  BsArrowRight,
  BsAward,
  BsCartPlus,
  BsDroplet,
  BsPlayCircle,
  BsShieldCheck,
  BsStarFill,
} from "react-icons/bs";
import heroImg from "../assets/paint-splash.jpg";
import productImg from "../assets/paint-featured.jpg";
import { BsTree, BsGem, BsPeople } from "react-icons/bs";
import aboutImg from "../assets/colorful-about.jpg";
import aboutImg2 from "../assets/paint-pen.jpg";
import founderImg from "../assets/Shola_Julius.jpeg";
import { features, products } from "@/util/data";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Link from "next/link";
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
              <div className="d-flex flex-wrap gap-4 align-items-center mb-lg-5">
                <Button
                  variant="warning"
                  size="md"
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
            <Col lg={5} className="d-none d-lg-block ">
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
        <div className="position-absolute bottom-0 w-100 bg-gradient shadow py-5 d-none d-sm-block">
          <Container>
            <Row className="g-4 text-center">
              <Col xs={6} md={3}>
                <div className="h3 fw-bold text-light mb-1">10K+</div>
                <div className="small text-white fw-bold">Happy Customers</div>
              </Col>
              <Col xs={6} md={3}>
                <div className="h3 fw-bold text-white mb-1">15</div>
                <div className="small text-white fw-bold">Years Warranty</div>
              </Col>
              <Col xs={6} md={3}>
                <div className="h3 fw-bold text-white mb-1">100%</div>
                <div className="small fw-bold text-white">
                  Satisfaction Guarantee
                </div>
              </Col>
              <Col xs={6} md={3}>
                <div className="h3 fw-bold text-white mb-1">24/7</div>
                <div className="small text-white fw-bold">Expert Support</div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section
        className="position-relative py-5 py-lg-8 bg-light shadow"
        // style={{ backgroundColor: "#f9f9f9" }}
      >
        {/* Decorative elements */}
        <div className="position-absolute top-0 end-0  h-100 bg-light" />

        <Container>
          <Row className="align-items-center">
            {/* Visual Storytelling Column */}
            <Col lg={6} className="mb-5 mb-lg-0 position-relative">
              <div className="position-relative">
                <Card className="border-0 shadow-lg overflow-hidden">
                  <Image
                    src={aboutImg2}
                    alt="Nexgen team working"
                    // fluid
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
              <Card className="bg-white p-4 rounded-3 shadow mt-5 border-start border-5">
                <div className="d-flex">
                  <Image
                    src={founderImg}
                    alt="Founder"
                    width={80}
                    height={80}
                    rounded="true"
                    className="me-3 rounded shadow"
                  />
                  <div>
                    <blockquote className="mb-2 fst-italic">
                      We don&apos;t just sell paint, we sell lasting beauty and
                      protection for what matters most.
                    </blockquote>
                    <div>
                      <h6 className="mb-0">Shola Julius</h6>
                      <p className="small text-muted mb-0">Founder & CEO</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Content Column */}
            <Col lg={6} className="">
              <div className="mb-4">
                <Badge
                  pill
                  bg="warning"
                  className="text-color-3 bg-opacity-10 px-3 py-2 mb-3"
                >
                  OUR STORY
                </Badge>
                <h2 className="display-5 fw-bold mb-4">
                  Revolutionizing{" "}
                  <span className="text-color-2">African Homes</span> Since 2010
                </h2>
                <p className="">
                  What started as a small Lagos paint shop has grown into
                  Nigeria&apos;s most trusted paint brand, transforming over
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
                  size="md"
                  className="rounded-pill px-4 shadow"
                >
                  Read More
                  <BsArrowRight className="ms-2" />
                </Button>
                {/* <Button
                  variant="outline-dark"
                  size="lg"
                  className="rounded-pill px-4"
                >
                  <BsPlayCircle className="me-2" />
                  Watch Our Story
                </Button> */}
              </div>
            </Col>
          </Row>

          {/* Milestones */}
        </Container>

        <Container>
          <Row className="mt-5 g-4 bg-light ">
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

      <section className="py-5 bg-light position-relative">
        {/* Decorative elements */}
        <div className="position-absolute top-0 end-0 w-50 h-100 bg-white opacity-50"></div>

        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="display-5 fw-bold mb-3">
                Why <span className="text-color-1">Choose Nexgen</span> Paint?
              </h2>
              <p className="lead">
                We don&apos;t just make paint - we create solutions tailored for
                African homes and businesses.
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            {features?.map((feature, index) => (
              <Col key={index} md={6} lg={4} className="feature-col">
                <Card className="h-100 border-0 shadow-sm hover-shadow transition-all bg-white">
                  <CardBody className="p-4 text-center">
                    <div className="icon-wrapper bg-info bg-opacity-10 rounded-circle p-3 mb-4 mx-auto">
                      <span className="text-color-1">{feature.icon}</span>
                    </div>
                    <h5 className="mb-3">{feature.title}</h5>
                    <p className="text-muted mb-0">{feature.description}</p>
                  </CardBody>
                </Card>
              </Col>
            ))}

            {/* CTA Card */}
            <Col md={6} lg={4} className="d-flex">
              <Card className="border-0 bg-blue text-white">
                <CardBody className="p-4 d-flex flex-column justify-content-center text-center">
                  <h4 className="mb-4">Ready to Transform Your Space?</h4>
                  <p className="mb-4">
                    Explore our premium paint collections tailored for every
                    surface and style.
                  </p>
                  <Button
                    variant="light"
                    size="md"
                    className="rounded-pill mt-auto"
                  >
                    Explore Paint Categories
                    <BsArrowRight className="ms-2" />
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Trust badges */}
          <Row className="mt-5 g-3 justify-content-center">
            <Col xs="auto">
              <div className="d-flex align-items-center bg-white p-3 rounded-3 shadow-sm">
                <span className="badge bg-success me-2">4.9</span>
                <span>★★★★★ (2,483 reviews)</span>
              </div>
            </Col>
            <Col xs="auto">
              <div className="d-flex align-items-center bg-white p-3 rounded-3 shadow-sm">
                <span className="badge bg-warning me-2">10+</span>
                <span>Years in Nigeria</span>
              </div>
            </Col>
            <Col xs="auto">
              <div className="d-flex align-items-center bg-white p-3 rounded-3 shadow-sm">
                <span className="badge bg-info me-2">50K+</span>
                <span>Projects Completed</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 my-5 bg-white">
        <Container>
          {/* Section Header */}
          <Row className="mb-5">
            <Col lg={8} className="mx-auto text-center">
              <h2 className="display-5 fw-bold mb-3">Featured Products</h2>
              <p className=" text-muted">
                Discover top-rated paints loved by professionals and homeowners
                alike
              </p>
            </Col>
          </Row>

          {/* Product Cards */}
          <Row className="g-4">
            {products.map((product) => (
              <Col key={product.id} md={6} lg={3}>
                <Card className="h-100 border-0 shadow-sm product-card">
                  {/* Product Badge */}
                  {product.badge && (
                    <Badge
                      pill
                      bg="warning"
                      className="position-absolute top-0 start-0 m-3"
                    >
                      {product.badge}
                    </Badge>
                  )}

                  {/* Product Image */}
                  <div className="product-image-wrapper">
                    <Image
                      width={300}
                      height={300}
                      // fill
                      variant="top"
                      src={product.image}
                      alt={product.name}
                      className="img-fluid"
                    />
                  </div>

                  <CardBody className="pt-4">
                    {/* Rating */}
                    <div className="d-flex align-items-center mb-2">
                      <div className="text-warning me-2">
                        <BsStarFill className="me-1" />
                        {product.rating}
                      </div>
                      <small className="text-muted">
                        ({product.reviews} reviews)
                      </small>
                    </div>

                    {/* Product Info */}
                    <h5 className="mb-1">{product.name}</h5>
                    <small className="text-muted d-block mb-2">
                      {product.category}
                    </small>

                    {/* Price */}
                    <div className="d-flex align-items-center mb-3">
                      <h4 className="mb-0 text-primary">{product.price}</h4>
                      {product.oldPrice && (
                        <small className="text-decoration-line-through text-muted ms-2">
                          {product.oldPrice}
                        </small>
                      )}
                    </div>

                    {/* CTA Buttons */}
                    <div className="d-grid gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        className="rounded-pill"
                      >
                        <BsCartPlus className="me-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="rounded-pill"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Section CTA */}
          <Row className="mt-5">
            <Col className="text-center">
              <Link href="/product">
                <Button
                  variant="outline-dark"
                  size="md"
                  className="rounded-pill px-4 shadow"
                >
                  Shop All Paint Products <BsArrowRight className="ms-2" />
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </PublicLayout>
  );
}
