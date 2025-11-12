"use client";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, Form } from "react-bootstrap";
import { formatDate, getStatusVariant } from "@/util/constant";
import DataTable from "@/components/tables/DataTable";
import { ordersData } from "@/util/data";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersAsync } from "@/slices/order/orderSlice";
import ViewOrderModal from "./modal/view-order";

export default function OrdersPage() {
  const orderInfo = useSelector((state) => state?.orders);

  const [orders, setOrders] = useState(orderInfo?.getAllOrdersResponse?.orders);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState("");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [viewOrderModal, setViewOrderModal] = useState(false);

  console.log("ordeeeee", orderInfo?.getAllOrdersResponse?.orders);
  useEffect(() => {
    try {
      dispatch(getAllOrdersAsync({}));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  const orderColumns = [
    { key: "id", label: "Order ID" },
    { key: "customerName", label: "Customer" },
    { key: "total", label: "Amount" },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span className={`badge bg-${getStatusVariant(value)}`}>{value}</span>
      ),
    },
    {
      key: "createdAt",
      label: "Order Date",
      render: (value) => formatDate(value),
    },
  ];

  const handleView = (order) => {
    setViewOrderModal(true);
    setSelectedOrder(order);
  };

  const handleUpdate = (order) => {
    setViewOrderModal(true);
    setSelectedOrder(order);
  };

  return (
    <>
      <ViewOrderModal
        show={viewOrderModal}
        onHide={() => setViewOrderModal(false)}
        data={selectedOrder}
      />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Orders Management</h1>
        <Form.Select
          style={{ width: "200px" }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </Form.Select>
      </div>

      <Card>
        <CardBody>
          <DataTable
            columns={orderColumns}
            data={orderInfo?.getAllOrdersResponse?.orders || []}
            keyField="id"
            onView={handleView}
            onEdit={handleUpdate}
            searchable={true}
          />

          <div className="d-flex justify-content-between align-items-center mt-3">
            <Button
              variant="outline-secondary"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              ← Previous
            </Button>

            <span className="fw-semibold">
              Page {page} of {totalPages}
            </span>

            <Button
              variant="primary"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next →
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
