"use client";
import { useEffect, useState } from "react";
import { Card, CardBody, Form } from "react-bootstrap";
import { formatDate, getStatusVariant } from "@/util/constant";
import DataTable from "@/components/tables/DataTable";
import { ordersData } from "@/util/data";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersAsync } from "@/slices/order/orderSlice";

export default function OrdersPage() {
  const [orders, setOrders] = useState(ordersData);
  const [statusFilter, setStatusFilter] = useState("all");

  const dispatch = useDispatch();
  const orderInfo = useSelector((state) => state?.order);

  console.log("ordeeeee", orderInfo?.getAllProductsResponse);
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
    { key: "customer", label: "Customer" },
    { key: "product", label: "Product" },
    { key: "amount", label: "Amount" },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span className={`badge bg-${getStatusVariant(value)}`}>{value}</span>
      ),
    },
    {
      key: "date",
      label: "Order Date",
      render: (value) => formatDate(value),
    },
  ];

  const handleView = (order) => {
    window.location.href = `/admin/orders/${order.id}`;
  };

  return (
    <div>
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
            data={filteredOrders}
            keyField="id"
            onView={handleView}
            searchable={true}
          />
        </CardBody>
      </Card>
    </div>
  );
}
