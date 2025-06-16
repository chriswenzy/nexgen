"use client";
import { products } from "@/util/data";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";

const ProductsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const categories = [...new Set(products.map((p) => p.category))];
  const subCategories = [...new Set(products.map((p) => p.subCategory))];

  const filteredProducts = products.filter((product) => {
    return (
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory ? product.category === selectedCategory : true) &&
      (selectedSubCategory ? product.subCategory === selectedSubCategory : true)
    );
  });

  //   const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    console.log("cart", product);
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center fw-bold">Our Products</h2>

      <Row className="mb-4">
        <Col md={4}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
          >
            <option value="">All Subcategories</option>
            {subCategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Col key={product.id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm border-0 rounded-4 product-card">
                <div className="position-relative">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
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
                    <del className="text-muted ms-2">{product.oldPrice}</del>
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
            <p className="text-center">No products match your search/filter.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ProductsSection;
