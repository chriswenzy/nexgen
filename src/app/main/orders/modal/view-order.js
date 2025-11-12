import {
  updateOrderAsync,
  updateOrderStatusAsync,
} from "@/slices/order/orderSlice";
import { useState } from "react";
import { Badge, Button, Form, Modal, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";

const ViewOrderModal = (props) => {
  const order = props?.data;
  if (!order) return null;

  const shipping = JSON.parse(order.shippingAddress);
  const [status, setStatus] = useState(order.status);
  const dispatch = useDispatch();

  const handleUpdateStatus = async () => {
    const payload = {
      id: order.id,
      status: status,
    };

    try {
      const result = await dispatch(updateOrderStatusAsync({ payload }));
      console.log("update response", result);
      if (updateOrderStatusAsync.fulfilled.match(result)) {
        setStatus("");
        props.onHide();
      } else {
        console.error("Login failed:", result);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    // Optionally close the modal after update
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="order-details-modal"
        centered
      >
        <Modal.Header closeButton className="bg-light border-bottom-0">
          <Modal.Title
            id="order-details-modal"
            className="fw-bold text-primary"
          >
            Order Details
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-4 py-3">
          {/* CUSTOMER INFO */}
          <div className="mb-4">
            <h5 className="fw-semibold mb-3">Customer Information</h5>
            <div className="p-3 rounded border bg-light">
              <p className="mb-1">
                <strong>Name:</strong> {order.customerName}
              </p>
              <p className="mb-1">
                <strong>Email:</strong> {order.customerEmail}
              </p>
              <p className="mb-1">
                <strong>Phone:</strong> {order.customerPhone}
              </p>
              <p className="mb-0">
                <strong>Address:</strong> {shipping.street}, {shipping.city},{" "}
                {shipping.state}, {shipping.country}
              </p>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="mb-4">
            <h5 className="fw-semibold mb-3">Order Summary</h5>
            <Table bordered hover responsive className="align-middle shadow-sm">
              <thead className="table-primary">
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price (₦)</th>
                  <th>Subtotal (₦)</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="d-flex align-items-center gap-2">
                      <img
                        src={item.product.image}
                        alt={item.productName}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                      />
                      {item.productName}
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity * parseFloat(item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <h6 className="mb-0 text-secondary">
                <strong>Status:</strong>{" "}
                <Badge
                  bg={
                    status === "PENDING"
                      ? "warning"
                      : status === "COMPLETED"
                      ? "success"
                      : "secondary"
                  }
                >
                  {status}
                </Badge>
              </h6>

              <h5 className="fw-bold text-end text-dark mb-0">
                Total: ₦{order.total}
              </h5>
            </div>
          </div>

          {/* UPDATE STATUS SECTION */}
          <div className="mb-3 p-3 rounded border bg-light">
            <Form.Label className="fw-semibold mb-2">
              Update Order Status
            </Form.Label>
            <div className="d-flex gap-3 align-items-center">
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-auto"
              >
                <option value="PENDING">Pending</option>
                <option value="PROCESSING">Processing</option>
                <option value="SHIPPED">Shipped</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="FAILED">Failed</option>
              </Form.Select>

              <Button variant="primary" onClick={handleUpdateStatus}>
                Update
              </Button>
            </div>
          </div>

          {/* DATE INFO */}
          <div className="text-muted small mt-3">
            <p className="mb-1">
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-top-0">
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewOrderModal;
