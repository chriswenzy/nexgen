"use client";
import PublicLayout from "@/components/layout/public-layout";
import { addToCart } from "@/slices/cart/cartSlice";
import { addOrderAsync } from "@/slices/order/orderSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("cartItems");
      const items = stored ? JSON.parse(stored) : [];
      setCart(items);
      setMounted(true);
      // dispatch(addToCart(items));
    }
  }, [dispatch]);

  useEffect(() => {
    if (mounted) {
      sessionStorage.setItem("cartItems", JSON.stringify(cart));
      // dispatch(addToCart(cart));
    }
  }, [cart, mounted, dispatch]);

  const getPriceValue = (price) => parseInt(price?.replace(/\D/g, ""));

  const total = cart?.reduce(
    (sum, item) => sum + getPriceValue(item.price) * item.quantity,
    0
  );

  console.log("cart items", cart);

  const handleCheckout = async () => {
    // if (cart.length === 0) return toast.warn("Your cart is empty.");
    // toast.success("Checkout successful!");
    // setCart([]);
    // sessionStorage.removeItem("cartItems");

    router.push("/checkout");
  };

  if (!mounted) return null; // Prevent mismatch by delaying render

  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map((item) =>
      item.id === productId && item.size === size
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCart(updatedCart);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId, size) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === productId && item.size === size)
    );
    setCart(updatedCart);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCart));
    toast.info("Item removed from cart.");
  };

  return (
    <PublicLayout>
      <Container className="py-5">
        <h2 className="fw-bold text-center mb-4">Shopping Cart</h2>

        {cart?.length === 0 ? (
          <Alert variant="info" className="text-center">
            Your cart is currently empty.
          </Alert>
        ) : (
          <>
            <Table responsive bordered hover className="bg-white shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((item) => (
                  <tr key={`${item.id}-${item.size}`}>
                    <td>
                      <div className="d-flex align-items-center">
                        <Image
                          width={50}
                          height={50}
                          src={item.image}
                          alt={item.name}
                          className="me-3 rounded"
                        />
                        <div>
                          <strong>{item.name}</strong>
                          <div className="text-muted small">
                            {item.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.size}</td>
                    <td>{item.price}</td>
                    <td style={{ width: "100px" }}>
                      <Form.Control
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.id,
                            item.size,
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </td>
                    <td>
                      ₦
                      {(
                        getPriceValue(item.price) * item.quantity
                      ).toLocaleString()}
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeFromCart(item.id, item.size)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Row className="justify-content-end">
              <Col md={6} lg={4}>
                <div className="border rounded p-3 bg-light shadow-sm">
                  <h5 className="fw-bold">Cart Summary</h5>
                  <div className="d-flex justify-content-between">
                    <span>Total:</span>
                    <strong className="text-success">
                      ₦{total?.toLocaleString()}
                    </strong>
                  </div>
                  <Button
                    variant="success"
                    className="w-100 mt-3"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </PublicLayout>
  );
};

export default CartPage;
