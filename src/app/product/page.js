"use client";
import PublicLayout from "@/components/layout/public-layout";
import { productCategories, quickLinks } from "@/util/data";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAsync } from "@/slices/products/productsSlice";
import { addToCart } from "@/slices/cart/cartSlice";
import { toast } from "react-toastify";

const Products = () => {
  const dispatch = useDispatch();
  const productsInfo = useSelector((state) => state?.product);

  useEffect(() => {
    try {
      dispatch(getAllProductsAsync({}));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));

    toast.success(`${product?.name} added to cart!`);

    // Get existing cart from sessionStorage or initialize
    let cartItems = [];

    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("cartItems");
      cartItems = stored ? JSON.parse(stored) : [];

      // Check if item already exists (based on id and size)
      const existingIndex = cartItems.findIndex(
        (item) => item.id === product.id && item.size === product.size
      );

      if (existingIndex >= 0) {
        // Update quantity
        cartItems[existingIndex].quantity += 1;
      } else {
        // Add new item with quantity
        cartItems.push({ ...product, quantity: 1 });
      }

      // Save back to sessionStorage
      sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  };

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
        {/* {productsInfo?.getAllProductsResponse && <ProductsSection />} */}

        <section className="my-5">
          <Container>
            <Row>
              {Array.isArray(productsInfo?.getAllProductsResponse?.products) &&
              productsInfo.getAllProductsResponse.products.length > 0 ? (
                productsInfo.getAllProductsResponse.products.map((product) => (
                  <Col key={product.id} md={6} lg={4} className="mb-4">
                    <Card className="h-100 shadow-sm border-0 rounded-4 product-card">
                      <div className="position-relative">
                        <Card.Img
                          variant="top"
                          src={product.image || "/images/placeholder.png"}
                          alt={product.name || "Product image"}
                          style={{
                            height: "250px",
                            objectFit: "cover",
                            borderTopLeftRadius: "1rem",
                            borderTopRightRadius: "1rem",
                          }}
                        />
                        {product.badge && (
                          <Badge
                            bg="warning"
                            text="dark"
                            className="position-absolute top-0 start-0 m-2 rounded-pill px-3 py-1 shadow"
                            style={{ fontSize: "0.75rem", fontWeight: "600" }}
                          >
                            {product.badge}
                          </Badge>
                        )}
                      </div>

                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="fw-semibold mb-1 text-truncate">
                          {product.name}
                        </Card.Title>

                        <Card.Text className="text-muted small mb-1">
                          {product.category} • {product.subCategory}
                        </Card.Text>

                        <Card.Text className="mb-2">
                          <small className="text-muted">Size:</small>{" "}
                          <span>{product.size}</span>
                        </Card.Text>

                        <Card.Text className="mb-3">
                          <span className="fw-bold text-success">
                            {product.price}
                          </span>{" "}
                          {product.oldPrice && (
                            <del className="text-muted ms-2">
                              {product.oldPrice}
                            </del>
                          )}
                        </Card.Text>

                        <div className="mt-auto">
                          <Button
                            variant="primary"
                            className="w-100 fw-semibold rounded-pill"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col>
                  <p className="text-center text-muted">
                    No products match your search/filter.
                  </p>
                </Col>
              )}
            </Row>
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
                    {/* <Button
                      variant="outline-dark"
                      className="mt-3 rounded-pill"
                    >
                      Explore All Paint Options
                      <BsArrowRight className="ms-2" />
                    </Button> */}
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
                      as={Link}
                      href="/contact-us"
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
