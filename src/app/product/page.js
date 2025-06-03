"use client";
import PublicLayout from "@/components/layout/public-layout";
import { productCategories, quickLinks } from "@/util/data";
import Image from "next/image";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Tab,
  Tabs,
} from "react-bootstrap";
import {
  BsCheckCircle,
  BsPalette,
  BsHouse,
  BsBuilding,
  BsBrush,
  BsQuestionCircle,
  BsArrowRight,
} from "react-icons/bs";
import aboutImg2 from "../../assets/art-brush.jpg";
import Home from "../page";
import HouseColorSelector from "@/components/colorSelector/colorSelector";

const Products = () => {
  // const getColorFamilyBase = (family) => {
  //   const colors = {
  //     Neutrals: "#f5f5f5",
  //     Blues: "#e3f2fd",
  //     Greens: "#e8f5e9",
  //     "Warm Tones": "#fff3e0",
  //     "Modern Grays": "#eceff1",
  //     "Vibrant Accents": "#fce4ec",
  //   };
  //   return colors[family] || "#ffffff";
  // };

  const [selectedColorFamily, setSelectedColorFamily] = useState(null);

  const getColorFamilyBase = (family) => {
    const colors = {
      Neutrals: "#d3cfc7",
      Blues: "#4a90e2",
      Greens: "#6ab04c",
      "Warm Tones": "#e67e22",
      "Modern Grays": "#7f8c8d",
      "Vibrant Accents": "#f39c12",
    };
    return colors[family] || "#ccc";
  };

  return (
    <PublicLayout>
      <div className="products-page">
        {/* Hero Section */}
        <section className="py-5 py-lg-7 bg-blue text-white">
          <Container>
            <Row className="align-items-center">
              <Col lg={6}>
                <h1 className="display-4 fw-bold mb-4">Our Paint Products</h1>
                <p className="lead mb-5">
                  Premium Paints for Every Surface, Every Style, Every Space.
                </p>
                <Button variant="light" size="md" className="rounded-pill px-4">
                  Find Your Perfect Paint <BsArrowRight className="ms-2" />
                </Button>
              </Col>
              <Col lg={6} className="d-none d-lg-block">
                <Image
                  src={aboutImg2}
                  width={600}
                  height={600}
                  alt="Our paint image"
                />
              </Col>
            </Row>
          </Container>
        </section>

        {/* Product Categories */}
        <section className="py-5 py-lg-7">
          <Container>
            <Tabs
              defaultActiveKey="interior"
              id="product-tabs"
              className="mb-5"
            >
              {productCategories.map((category) => (
                <Tab
                  key={category.id}
                  eventKey={category.id}
                  title={
                    <span className="d-flex align-items-center">
                      {category.id === "interior" && (
                        <BsHouse className="me-2" />
                      )}
                      {category.id === "exterior" && (
                        <BsBuilding className="me-2" />
                      )}
                      {category.id === "industrial" && (
                        <BsBuilding className="me-2" />
                      )}
                      {category.id === "primers" && (
                        <BsBrush className="me-2" />
                      )}
                      {category.title}
                    </span>
                  }
                >
                  <Row className="g-4 mt-3">
                    <Col lg={6}>
                      <Card className="h-100 border-0 shadow-sm">
                        <Card.Body className="p-4">
                          <h2 className="mb-4">{category.title}</h2>
                          <p className="lead mb-4">{category.description}</p>

                          <div className="mb-5">
                            <h5 className="mb-3">Top Features:</h5>
                            <ul className="list-unstyled">
                              {category.features.map((feature, index) => (
                                <li key={index} className="mb-2 d-flex">
                                  <BsCheckCircle className="text-color-2 me-2 mt-1" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mb-4">
                            <h5 className="mb-3">Popular Products:</h5>
                            <div className="d-flex flex-wrap gap-2">
                              {category.popularProducts.map(
                                (product, index) => (
                                  <Badge
                                    key={index}
                                    pill
                                    bg="light"
                                    text="dark"
                                    className="px-3 py-2"
                                  >
                                    {product}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>

                          {/* <Button className="rounded-pill px-4 bg-blue">
                            {category.cta}

                            <BsArrowRight className="ms-2" />
                          </Button> */}
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col lg={6}>
                      <div className="rounded-4 overflow-hidden shadow-sm h-100">
                        <Image
                          src={category.image}
                          alt={category.title}
                          width={300}
                          height={300}
                          layout="responsive"
                          objectFit="cover"
                          priority
                          placeholder="blur"
                          blurDataURL={category.image}
                          className="img-fluid h-100 object-fit-cover"
                        />
                      </div>
                    </Col>
                  </Row>
                </Tab>
              ))}
            </Tabs>
          </Container>
        </section>

        {/* Quick Links & Consultation */}
        <section className="py-5 bg-light">
          <Container>
            <Row className="g-4">
              <Col md={8}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="p-4">
                    <h3 className="mb-4">Quick Links to Products</h3>
                    <Row>
                      {quickLinks.map((product, index) => (
                        <Col key={index} sm={6} className="mb-3">
                          <a
                            href="#"
                            className="text-decoration-none d-flex align-items-center"
                          >
                            <BsArrowRight className="text-primary me-2" />
                            {product}
                          </a>
                        </Col>
                      ))}
                    </Row>
                    <Button
                      variant="outline-dark"
                      className="mt-3 rounded-pill"
                    >
                      Explore All Paint Options
                      <BsArrowRight className="ms-2" />
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="border-0 bg-orange text-white h-100">
                  <Card.Body className="p-4 d-flex flex-column">
                    <div className="mb-4">
                      <BsQuestionCircle size={48} className="mb-3" />
                      <h3>Not Sure What You Need?</h3>
                      <p>
                        Get expert advice on color choice, paint type, or
                        quantity.
                      </p>
                    </div>
                    <Button
                      variant="light"
                      className="rounded-pill mt-auto px-4"
                    >
                      Book a Free Paint Consultation
                      <BsArrowRight className="ms-2" />
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Color Families */}
        <section className="py-5 py-lg-7 my-5">
          <Container>
            <Row className="justify-content-center mb-5">
              <Col lg={8} className="text-center">
                <h2 className="display-5 fw-bold mb-3">Find Your Color</h2>
                <p className=" text-muted">
                  Explore our carefully curated color families to find your
                  perfect shade
                </p>
              </Col>
            </Row>

            {/* <Row className="g-4">
              {[
                "Neutrals",
                "Blues",
                "Greens",
                "Warm Tones",
                "Modern Grays",
                "Vibrant Accents",
              ].map((colorFamily, index) => (
                <Col key={index} sm={6} md={4} lg={2}>
                  <Card className="border-0 shadow-sm h-100 text-center color-family-card">
                    <div
                      className="color-swatch rounded-top"
                      style={{
                        backgroundColor: getColorFamilyBase(colorFamily),
                        height: "100px",
                      }}
                    ></div>
                    <Card.Body>
                      <h6 className="mb-0">{colorFamily}</h6>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row> */}

            <HouseColorSelector />

            {/* <div className="text-center mt-5">
              <Button variant="primary" size="lg" className="rounded-pill px-4">
                Explore Our Color Families <BsPalette className="ms-2" />
              </Button>
            </div> */}
          </Container>
        </section>
      </div>
    </PublicLayout>
  );
};

export default Products;
