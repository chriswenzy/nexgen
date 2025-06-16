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
import ProductsSection from "@/components/product-section/products";

const Products = () => {
  return (
    <PublicLayout>
      <div className="products">
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
                {/* <Image
                  src={aboutImg2}
                  width={600}
                  height={600}
                  alt="Our paint image"
                /> */}
              </Col>
            </Row>
          </Container>
        </section>

        <ProductsSection />

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
            <HouseColorSelector />
          </Container>
        </section>
      </div>
    </PublicLayout>
  );
};

export default Products;
