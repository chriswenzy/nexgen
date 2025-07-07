"use client";

import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Image from "next/image";
import { BsShieldLock, BsTruck } from "react-icons/bs";
import { useEffect, useState } from "react";
import PublicLayout from "@/components/layout/public-layout";
// import { PaystackButton } from "react-paystack";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Formik } from "formik";

const CheckoutPage = () => {
  const [cartItems, setCart] = useState([]);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const paystackKey = process.env.PAYSTACK_KEY;

  const PaystackButton = dynamic(
    () => import("react-paystack").then((mod) => mod.PaystackButton),
    {
      ssr: false,
      loading: () => (
        <Button disabled className="w-100 rounded-pill py-3 fw-bold">
          Loading payment...
        </Button>
      ),
    }
  );
  const parsePrice = (priceStr) => {
    return parseInt(priceStr.replace(/[₦,]/g, "").trim(), 10);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("cartItems");
      const items = stored ? JSON.parse(stored) : [];
      setCart(items);
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, mounted]);

  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * parsePrice(item.price),
    0
  );

  const handlePaymentSuccess = () => {
    toast.success("Payment successful! 🎉 Your order has been placed.", {
      position: "top-center",
      autoClose: 4000,
    });

    // Clear cart in state
    setCart([]);

    // Safely access window and clear session storage
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("cartItems");
    }

    // Optional: Delay before redirect to let user see toast
    setTimeout(() => {
      router.push("/product");
    }, 1000);

    console.log("✅ Payment success handled");
  };

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isFormValid = () => {
    return Object.values(formData).every((val) => val.trim() !== "");
  };

  const componentProps = {
    email: formData.email.trim(),
    amount: total * 100,
    metadata: {
      name: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
    },
    publicKey: paystackKey,
    text: "Place Order",
    onSuccess: () => {
      handlePaymentSuccess();
    },
    onClose: () => toast.warning("Payment was cancelled."),
  };

  if (mounted && cartItems.length === 0) {
    return (
      <PublicLayout>
        <Container className="py-5 text-center">
          <h3>Your cart is empty 🛒</h3>
          <Button href="/product" variant="warning" className="mt-3">
            Go Back to Shop
          </Button>
        </Container>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <Container className="my-5">
        <Row className="gy-4">
          {/* Campaign Details */}
          <Col md={6}>
            <Card className="shadow border-0 h-100">
              <Card.Body>
                <div className="mb-3">
                  <h2 className="mb-1">{crowdfundingInfo?.data?.name}</h2>
                  <small className="text-muted">
                    Category: {crowdfundingInfo?.data?.category?.name}
                  </small>
                </div>

                <Card.Text className="mb-2">
                  <strong>Description:</strong>{" "}
                  {crowdfundingInfo?.data?.description}
                </Card.Text>
                <Card.Text className="mb-2">
                  <strong>Model:</strong> {crowdfundingInfo?.data?.model}
                </Card.Text>
                <Card.Text className="mb-2">
                  <strong>Duration:</strong> {crowdfundingInfo?.data?.duration}
                </Card.Text>
                <Card.Text className="mb-2">
                  <strong>Goal:</strong> ₦
                  {Number(crowdfundingInfo?.data?.goal).toLocaleString()}
                </Card.Text>

                <hr />

                <div className="mt-3">
                  <h6 className="fw-semibold text-secondary">Organizer</h6>
                  <Card.Text className="mb-1">
                    {crowdfundingInfo?.data?.created_by.first_name}{" "}
                    {crowdfundingInfo?.data?.created_by.last_name}
                  </Card.Text>
                  <Card.Text className="mb-1 text-muted">
                    {crowdfundingInfo?.data?.created_by.email}
                  </Card.Text>
                  <Card.Text className="text-muted">
                    {crowdfundingInfo?.data?.created_by.phone_number}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Donation Form */}
          <Col md={6}>
            <Card className="shadow border-0 h-100">
              <Card.Body>
                <h4 className="mb-4">Support this Campaign</h4>

                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    phone: "",
                    amount: "",
                    paymentMethod: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    // Payment method specific submission handled by their buttons
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    isValid,
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="John Doe"
                          value={values.name}
                          onChange={handleChange}
                          isInvalid={touched.name && !!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="johndoe@example.com"
                          value={values.email}
                          onChange={handleChange}
                          isInvalid={touched.email && !!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          placeholder="+234..."
                          value={values.phone}
                          onChange={handleChange}
                          isInvalid={touched.phone && !!errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Amount (₦)</Form.Label>
                        <Form.Control
                          type="number"
                          name="amount"
                          placeholder="1000"
                          value={values.amount}
                          onChange={handleChange}
                          isInvalid={touched.amount && !!errors.amount}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.amount}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Payment Methods Section */}
                      <div className="mb-4">
                        <h6 className="mb-3 fw-semibold">Payment Method</h6>
                        <div className="d-flex flex-column gap-2">
                          {payment_method.map((method) => (
                            <div
                              key={method.id}
                              className={`payment-method-card p-3 rounded-3 border ${
                                values.paymentMethod === method.id
                                  ? "border-primary bg-primary-light"
                                  : "border-light"
                              }`}
                              onClick={() =>
                                handleChange({
                                  target: {
                                    name: "paymentMethod",
                                    value: method.id,
                                  },
                                })
                              }
                              style={{ cursor: "pointer" }}
                            >
                              <div className="d-flex align-items-center">
                                <div className="me-3">
                                  <Image
                                    src={method.image}
                                    alt={method.name}
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      objectFit: "contain",
                                    }}
                                  />
                                </div>
                                <div>
                                  <h6 className="mb-0">{method.name}</h6>
                                  <small className="text-muted">
                                    {method.description}
                                  </small>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {isValid && values.paymentMethod ? (
                        values.paymentMethod ===
                        "9a66259f-7274-43e2-bfc1-27fda52599ae" ? (
                          <PaystackButton
                            className="btn btn-success w-100 py-3 fw-bold"
                            {...{
                              email: values.email,
                              amount: parseInt(values.amount) * 100,
                              metadata: {
                                name: values.name,
                                phone: values.phone,
                                campaignId: crowdfundingInfo?.data?.id,
                              },
                              publicKey: payment_method.find(
                                (m) => m.id === values.paymentMethod
                              )?.publicKey,
                              text: `Pay with Paystack - ₦${values.amount}`,
                              onSuccess: () => alert("Payment Successful"),
                              onClose: () => alert("Payment Cancelled"),
                            }}
                          />
                        ) : (
                          <Button
                            variant="primary"
                            className="w-100 py-3 fw-bold"
                          >
                            Pay with{" "}
                            {
                              payment_method.find(
                                (m) => m.id === values.paymentMethod
                              )?.name
                            }{" "}
                            - ₦{values.amount}
                          </Button>
                        )
                      ) : (
                        <Button
                          variant="secondary"
                          disabled
                          className="w-100 py-3"
                        >
                          {!values.paymentMethod
                            ? "Select a payment method"
                            : "Fill all fields to enable payment"}
                        </Button>
                      )}
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .payment-method-card {
          transition: all 0.3s ease;
        }
        .payment-method-card:hover {
          border-color: #0d6efd !important;
          background-color: rgba(13, 110, 253, 0.05);
        }
        .bg-primary-light {
          background-color: rgba(13, 110, 253, 0.1) !important;
        }
        .btn-success {
          background: linear-gradient(135deg, #28a745, #20c997);
          border: none;
          box-shadow: 0 4px 6px rgba(40, 167, 69, 0.3);
        }
        .btn-primary {
          background: linear-gradient(135deg, #0d6efd, #6610f2);
          border: none;
          box-shadow: 0 4px 6px rgba(13, 110, 253, 0.3);
        }
      `}</style>
    </PublicLayout>
  );
};

export default CheckoutPage;
