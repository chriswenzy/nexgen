"use client";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Link from "next/link";
import DataTable from "@/components/tables/DataTable";
import { productsData } from "@/util/data";
import { getStatusVariant } from "@/util/constant";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAsync } from "@/slices/products/productsSlice";

export default function ProductsPage() {
  const [products, setProducts] = useState(productsData);

  const dispatch = useDispatch();
  const productsInfo = useSelector((state) => state?.product);

  console.log("prooooo", productsInfo?.getAllProductsResponse);
  useEffect(() => {
    try {
      dispatch(getAllProductsAsync({}));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  const productColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Product Name" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price" },
    {
      key: "stock",
      label: "Stock",
      render: (value) => `${value} units`,
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span className={`badge bg-${getStatusVariant(value)}`}>{value}</span>
      ),
    },
    {
      key: "sales",
      label: "Sales",
      render: (value) => `${value} units`,
    },
  ];

  const handleEdit = (product) => {
    // Navigate to edit page
    window.location.href = `/admin/products/${product.id}`;
  };

  const handleDelete = (product) => {
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
      setProducts(products.filter((p) => p.id !== product.id));
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Products Management</h1>
        <Link href="/main/products/new">
          <Button variant="primary">+ Add New Product</Button>
        </Link>
      </div>

      <Card>
        <Card.Body>
          <DataTable
            columns={productColumns}
            data={productsInfo?.getAllProductsResponse?.products || []}
            keyField="id"
            onEdit={handleEdit}
            onDelete={handleDelete}
            searchable={true}
          />
        </Card.Body>
      </Card>
    </div>
  );
}
