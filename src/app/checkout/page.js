"use client";

import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Image from "next/image";
import { BsShieldLock, BsTruck } from "react-icons/bs";
import { useEffect, useState } from "react";
import PublicLayout from "@/components/layout/public-layout";
// import { PaystackButton } from "react-paystack";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addOrderAsync } from "@/slices/order/orderSlice";

const CheckoutPage = () => {
  const [cartItems, setCart] = useState([]);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const paystackKey = process.env.PAYSTACK_KEY;
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [orderRef, setOrderRef] = useState(null);
  const dispatch = useDispatch();
  console.log("pay btn", paystackKey);
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

  // const componentProps = {
  //   email: formData.email,
  //   amount: total * 100,
  //   metadata: {
  //     name: formData.fullName,
  //     phone: formData.phone,
  //     orderRef,
  //   },
  //   publicKey: paystackKey,
  //   text: creatingOrder ? "Creating Order..." : "Pay Now",
  //   onSuccess: (response) => {
  //     toast.success("🎉 Payment successful!");
  //     console.log("Payment response:", response);
  //     // router.push("/order-success");
  //   },
  //   onClose: () => toast("Payment cancelled."),
  // };

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
    publicKey: "pk_test_97bd804bc5e88420924d2d0bfa7ce0ab903e215e",
    text: creatingOrder ? "Creating Order..." : "Pay Now",
    onSuccess: (response) => {
      toast.success("🎉 Payment successful!");
      console.log("Payment response:", response);
      sessionStorage.removeItem("cartItems");
      router.push("/product");
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

  const handleAddOrder = async () => {
    try {
      setCreatingOrder(true);

      const payload = {
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          country: "Nigeria",
        },
        items: cartItems.map((item) => ({
          productName: item.name,
          productId: item.id,
          quantity: item.quantity,
          price: parsePrice(item.price),
        })),
        totalAmount: total,
        paymentMethod: "Paystack",
      };

      const result = await dispatch(addOrderAsync({ values: payload }));
      console.log("order result", result);

      if (addOrderAsync.fulfilled.match(result)) {
        const order = result.payload?.data || result.payload;

        console.log("order info", order?.order?.id);
        toast.success(
          "✅ Order created successfully. Proceeding to payment..."
        );
        setOrderRef(order?.order?.id);
        return order;
      } else {
        toast.error("❌ Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Order creation error:", error);
      toast.error("⚠️ An unexpected error occurred.");
    } finally {
      setCreatingOrder(false);
    }
  };

  return (
    <PublicLayout>
      <Container className="py-5">
        <Row>
          {/* =========================
            BILLING & SHIPPING FORM
        ========================== */}
          <Col lg={7}>
            <h2 className="mb-4 fw-bold">Checkout</h2>

            <Card className="mb-4 shadow-sm border-0 rounded-4">
              <Card.Body>
                <h5 className="mb-3 fw-semibold">Billing & Shipping Info</h5>
                <Form>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+234..."
                        required
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label>Delivery Address</Form.Label>
                      <Form.Control
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="12 Industrial Road, Lagos"
                        required
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Lagos"
                        required
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Lagos State"
                        required
                      />
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>

            {/* =========================
              PAYMENT METHOD
          ========================== */}
            <Card className="shadow-sm border-0 rounded-4">
              <Card.Body>
                <h5 className="mb-3 fw-semibold">Payment Method</h5>
                <Form>
                  <Form.Check
                    name="payment"
                    label="Pay with Card or Transfer (via Paystack)"
                    type="radio"
                    defaultChecked
                    className="mb-2"
                  />
                </Form>
                <p className="small text-muted mt-2">
                  <BsShieldLock className="me-1" />
                  Transactions are secured & encrypted
                </p>
              </Card.Body>
            </Card>
          </Col>

          {/* =========================
            ORDER SUMMARY
        ========================== */}
          <Col lg={5} className="mt-4 mt-lg-0">
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body>
                <h5 className="mb-4 fw-semibold">Order Summary</h5>

                {cartItems.map((item) => {
                  const unitPrice = parsePrice(item.price);
                  const lineTotal = item.quantity * unitPrice;

                  return (
                    <div
                      key={item.id}
                      className="d-flex align-items-center mb-3 border-bottom pb-2"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded me-3"
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">{item.name}</h6>
                        <small>
                          Qty: {item.quantity} × ₦{unitPrice.toLocaleString()}
                        </small>
                      </div>
                      <div>₦{lineTotal.toLocaleString()}</div>
                    </div>
                  );
                })}

                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <strong>₦{total.toLocaleString()}</strong>
                </div>
                <div className="d-flex justify-content-between fs-5 border-top pt-3">
                  <strong>Total</strong>
                  <strong>₦{total.toLocaleString()}</strong>
                </div>

                <div className="mt-4">
                  {isFormValid() ? (
                    orderRef ? (
                      <PaystackButton
                        {...componentProps}
                        className="btn btn-success w-100 rounded-pill py-3 fw-bold"
                      />
                    ) : (
                      <Button
                        onClick={handleAddOrder}
                        disabled={creatingOrder}
                        variant="success"
                        className="w-100 rounded-pill py-3 fw-bold"
                      >
                        {creatingOrder ? "Processing..." : "Proceed to Payment"}
                      </Button>
                    )
                  ) : (
                    <Button
                      variant="secondary"
                      disabled
                      className="w-100 rounded-pill py-3 fw-bold"
                    >
                      Fill all required fields to continue
                    </Button>
                  )}
                </div>

                <p className="text-center text-muted mt-3 small">
                  <BsTruck className="me-1" /> Fast nationwide delivery
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PublicLayout>
  );
};

export default CheckoutPage;
