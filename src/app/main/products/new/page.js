"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Form as RBForm,
  Button,
  Row,
  Col,
  Card,
  FloatingLabel,
  Image,
} from "react-bootstrap";
import { addProductsAsync } from "@/slices/products/productsSlice";
import { useDispatch } from "react-redux";

const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string(),
  category: Yup.string().required("Category is required"),
  subCategory: Yup.string(),
  size: Yup.string().required("Size is required"),
  price: Yup.string().required("Price is required"),
  oldPrice: Yup.string(),
  image: Yup.mixed().required("Product image is required"),
  stock: Yup.number()
    .integer("Stock must be an integer")
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),
  featured: Yup.boolean(),
});

export default function ProductForm() {
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();

      // append all form values
      Object.entries(values).forEach(([key, value]) => {
        if (key === "image") {
          formData.append("image", value); // file object
        } else {
          formData.append(key, value);
        }
      });

      //   const result = await dispatch(addProductsAsync({ values: formData }));
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload product");

      alert("✅ Product uploaded successfully!");
      resetForm();
      setPreview(null);
    } catch (error) {
      console.error("❌ Upload Error:", error);
    }
  };

  return (
    <div className="p-4">
      <Card className="shadow-sm border-0 rounded-4">
        <Card.Header className="bg-white border-0 pb-0">
          <h4 className="fw-semibold text-primary">Add New Product</h4>
          <p className="text-muted small mb-0">
            Upload product details and image below.
          </p>
        </Card.Header>

        <Card.Body className="pt-3">
          <Formik
            initialValues={{
              name: "",
              description: "",
              category: "",
              subCategory: "",
              size: "",
              price: "",
              oldPrice: "",
              image: null,
              stock: 0,
              featured: false,
            }}
            validationSchema={ProductSchema}
            onSubmit={handleSubmit}
          >
            {({
              errors,
              touched,
              handleChange,
              handleSubmit,
              setFieldValue,
              values,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <FloatingLabel controlId="name" label="Product Name">
                      <RBForm.Control
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        isInvalid={touched.name && !!errors.name}
                        placeholder="Product name"
                      />
                      <RBForm.Control.Feedback type="invalid">
                        {errors.name}
                      </RBForm.Control.Feedback>
                    </FloatingLabel>
                  </Col>

                  <Col md={6}>
                    <FloatingLabel controlId="category" label="Category">
                      <RBForm.Control
                        type="text"
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        isInvalid={touched.category && !!errors.category}
                        placeholder="Category"
                      />
                      <RBForm.Control.Feedback type="invalid">
                        {errors.category}
                      </RBForm.Control.Feedback>
                    </FloatingLabel>
                  </Col>

                  <Col md={6}>
                    <FloatingLabel controlId="subCategory" label="Sub Category">
                      <RBForm.Control
                        type="text"
                        name="subCategory"
                        value={values.subCategory}
                        onChange={handleChange}
                        placeholder="Sub Category"
                      />
                    </FloatingLabel>
                  </Col>

                  <Col md={6}>
                    <FloatingLabel controlId="size" label="Size">
                      <RBForm.Control
                        type="text"
                        name="size"
                        value={values.size}
                        onChange={handleChange}
                        isInvalid={touched.size && !!errors.size}
                        placeholder="Size"
                      />
                      <RBForm.Control.Feedback type="invalid">
                        {errors.size}
                      </RBForm.Control.Feedback>
                    </FloatingLabel>
                  </Col>

                  <Col md={6}>
                    <FloatingLabel controlId="price" label="Price">
                      <RBForm.Control
                        type="text"
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                        isInvalid={touched.price && !!errors.price}
                        placeholder="₦55,000"
                      />
                      <RBForm.Control.Feedback type="invalid">
                        {errors.price}
                      </RBForm.Control.Feedback>
                    </FloatingLabel>
                  </Col>

                  <Col md={6}>
                    <FloatingLabel controlId="oldPrice" label="Old Price">
                      <RBForm.Control
                        type="text"
                        name="oldPrice"
                        value={values.oldPrice}
                        onChange={handleChange}
                        placeholder="₦60,000"
                      />
                    </FloatingLabel>
                  </Col>

                  <Col md={12}>
                    <FloatingLabel controlId="description" label="Description">
                      <RBForm.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        placeholder="Short product description..."
                        style={{ height: "100px" }}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col md={12}>
                    <RBForm.Group controlId="image">
                      <RBForm.Label className="fw-semibold">
                        Product Image
                      </RBForm.Label>
                      <RBForm.Control
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.currentTarget.files[0];
                          setFieldValue("image", file);
                          setPreview(URL.createObjectURL(file));
                        }}
                        isInvalid={touched.image && !!errors.image}
                      />
                      <RBForm.Control.Feedback type="invalid">
                        {errors.image}
                      </RBForm.Control.Feedback>

                      {preview && (
                        <div className="mt-3 text-center">
                          <Image
                            src={preview}
                            alt="Preview"
                            thumbnail
                            style={{
                              maxHeight: "200px",
                              borderRadius: "0.75rem",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      )}
                    </RBForm.Group>
                  </Col>

                  <Col md={6}>
                    <FloatingLabel controlId="stock" label="Stock Quantity">
                      <RBForm.Control
                        type="number"
                        name="stock"
                        value={values.stock}
                        onChange={handleChange}
                        isInvalid={touched.stock && !!errors.stock}
                        placeholder="0"
                      />
                      <RBForm.Control.Feedback type="invalid">
                        {errors.stock}
                      </RBForm.Control.Feedback>
                    </FloatingLabel>
                  </Col>

                  <Col md={6} className="d-flex align-items-center mt-2">
                    <RBForm.Check
                      type="switch"
                      id="featured"
                      name="featured"
                      label="Mark as Featured"
                      checked={values.featured}
                      onChange={handleChange}
                      className="ms-2"
                    />
                  </Col>

                  <Col md={12} className="text-end mt-3">
                    <Button
                      variant="primary"
                      type="submit"
                      className="px-4 py-2 rounded-3"
                    >
                      <i className="bi bi-upload me-2"></i>
                      Upload Product
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </div>
  );
}
