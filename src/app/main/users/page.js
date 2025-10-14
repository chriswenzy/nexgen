"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Dropdown,
  Badge,
  InputGroup,
  Form,
} from "react-bootstrap";
import { usersData } from "@/util/data";
import { formatDate, getStatusVariant } from "@/util/constant";
import DataTable from "@/components/tables/DataTable";
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
  FaUserPlus,
  FaEnvelope,
  FaEllipsisV,
  FaUsers,
  FaSort,
  FaSync,
} from "react-icons/fa";
import "./UsersPage.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAsync } from "@/slices/user/userSlice";

export default function UsersPage() {
  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const dispatch = useDispatch();
  const usersInfo = useSelector((state) => state?.user);
  console.log("users", usersInfo);
  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  useEffect(() => {
    try {
      dispatch(getAllUsersAsync({}));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "orders":
        return b.orders - a.orders;
      case "joinDate":
        return new Date(b.joinDate) - new Date(a.joinDate);
      default:
        return 0;
    }
  });

  const userColumns = [
    {
      key: "id",
      label: "ID",
      sortable: true,
    },
    {
      key: "name",
      label: "Name",
      render: (value, row) => (
        <div className="user-info-cell">
          <div className="user-avatar-sm">
            {row.avatar ? (
              <img src={row.avatar} alt={value} />
            ) : (
              <div className="avatar-placeholder">{value.charAt(0)}</div>
            )}
          </div>
          <div className="user-details">
            <div className="user-name">{value}</div>
            <div className="user-email">{row.email}</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      key: "role",
      label: "Role",
      render: (value) => (
        <Badge bg="outline-primary" className="role-badge">
          {value}
        </Badge>
      ),
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span className={`status-badge status-${value}`}>
          <span className="status-dot"></span>
          {value}
        </span>
      ),
      sortable: true,
    },
    {
      key: "orders",
      label: "Orders",
      render: (value) => <span className="orders-count">{value}</span>,
      sortable: true,
    },
    {
      key: "joinDate",
      label: "Join Date",
      render: (value) => (
        <div className="date-cell">
          <div className="date">{formatDate(value)}</div>
          <div className="time-ago">{getTimeAgo(value)}</div>
        </div>
      ),
      sortable: true,
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="actions-cell">
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-secondary"
              className="action-toggle"
            >
              <FaEllipsisV />
            </Dropdown.Toggle>
            <Dropdown.Menu className="action-menu">
              <Dropdown.Item onClick={() => handleView(row)}>
                <FaEye className="me-2" />
                View Details
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleEdit(row)}>
                <FaEdit className="me-2" />
                Edit User
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleEmail(row)}>
                <FaEnvelope className="me-2" />
                Send Email
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => handleDelete(row)}
                className="text-danger"
              >
                <FaTrash className="me-2" />
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
    },
  ];

  const handleEdit = (user) => {
    window.location.href = `/admin/users/${user.id}`;
  };

  const handleView = (user) => {
    window.location.href = `/admin/users/${user.id}/view`;
  };

  const handleEmail = (user) => {
    window.location.href = `mailto:${user.email}`;
  };

  const handleDelete = (user) => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      setUsers(users.filter((u) => u.id !== user.id));
    }
  };

  const handleAddUser = () => {
    window.location.href = "/main/users/new";
  };

  const handleExport = () => {
    // Export functionality
    console.log("Exporting users data...");
  };

  const handleRefresh = () => {
    // Refresh data
    setUsers([...usersData]);
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const joinDate = new Date(date);
    const diffTime = Math.abs(now - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "Active").length,
    pending: users.filter((u) => u.status === "Pending").length,
    suspended: users.filter((u) => u.status === "Suspended").length,
  };

  return (
    <div className="users-page">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-title">
            <FaUsers className="header-icon" />
            <div>
              <h1>Users Management</h1>
              <p>Manage your platform users and their permissions</p>
            </div>
          </div>
          <Button
            variant="primary"
            className="add-user-btn"
            onClick={handleAddUser}
          >
            <FaUserPlus className="me-2" />
            Add New User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <Card className="stat-card">
          <CardBody>
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-value">{stats.total}</div>
                <div className="stat-label">Total Users</div>
              </div>
              <div className="stat-icon total">
                <FaUsers />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="stat-card">
          <CardBody>
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-value">{stats.active}</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat-icon active">
                <FaUsers />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="stat-card">
          <CardBody>
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-value">{stats.pending}</div>
                <div className="stat-label">Pending</div>
              </div>
              <div className="stat-icon pending">
                <FaUsers />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="stat-card">
          <CardBody>
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-value">{stats.suspended}</div>
                <div className="stat-label">Suspended</div>
              </div>
              <div className="stat-icon suspended">
                <FaUsers />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="filters-card">
        <CardBody>
          <div className="filters-row">
            <div className="search-section">
              <InputGroup className="search-input">
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </div>

            <div className="filters-section">
              <div className="filter-group">
                <Form.Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Suspended">Suspended</option>
                </Form.Select>
              </div>

              <div className="filter-group">
                <Form.Select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Moderator">Moderator</option>
                </Form.Select>
              </div>

              <div className="filter-group">
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Sort by Name</option>
                  <option value="orders">Sort by Orders</option>
                  <option value="joinDate">Sort by Join Date</option>
                </Form.Select>
              </div>
            </div>

            <div className="actions-section">
              <Button variant="outline-secondary" onClick={handleRefresh}>
                <FaSync className="me-2" />
                Refresh
              </Button>
              <Button variant="outline-primary" onClick={handleExport}>
                <FaDownload className="me-2" />
                Export
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Users Table */}
      <Card className="users-table-card">
        <CardBody>
          <DataTable
            columns={userColumns}
            data={usersInfo?.getAllUsersResponse?.users || usersData}
            keyField="id"
            searchable={false}
            emptyMessage={
              <div className="empty-state">
                <FaUsers className="empty-icon" />
                <h3>No users found</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            }
          />
        </CardBody>
      </Card>
    </div>
  );
}
