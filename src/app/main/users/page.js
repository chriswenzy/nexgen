"use client";
import { useState } from "react";
import { Card, CardBody } from "react-bootstrap";
import { usersData } from "@/util/data";
import { formatDate, getStatusVariant } from "@/util/constant";
import DataTable from "@/components/tables/DataTable";

export default function UsersPage() {
  const [users, setUsers] = useState(usersData);

  const userColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span className={`badge bg-${getStatusVariant(value)}`}>{value}</span>
      ),
    },
    { key: "orders", label: "Total Orders" },
    {
      key: "joinDate",
      label: "Join Date",
      render: (value) => formatDate(value),
    },
  ];

  const handleEdit = (user) => {
    window.location.href = `/admin/users/${user.id}`;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Users Management</h1>
      </div>

      <Card>
        <CardBody>
          <DataTable
            columns={userColumns}
            data={users}
            keyField="id"
            onEdit={handleEdit}
            searchable={true}
          />
        </CardBody>
      </Card>
    </div>
  );
}
